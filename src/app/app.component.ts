import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FolderComponent } from './components/folder/folder.component';
import { AddfolderComponent } from './pages/addfolder/addfolder.component';
import { FolderService, Folder } from './services/folder.service';
import { NavService } from './services/nav.service';
import { Subscription } from 'rxjs';
import { AddlinkComponent } from './pages/addlink/addlink.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FolderComponent,
    AddfolderComponent,
    AddlinkComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  filteredFolders: Folder[] = [];
  folders: Folder[] = [];
  constructor(
    private navService: NavService,
    private folderService: FolderService
  ) {}
  activePage: string = 'folders';
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.navService.activePage$.subscribe((page) => {
      this.activePage = page;
    });
    this.folderService.folders$.subscribe((folders) => {
      this.folders = folders;
      this.filterFolders();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filterFolders() {
    if (this.searchTerm === '') {
      this.filteredFolders = [...this.folders];
      return;
    }

    this.filteredFolders = this.folders.filter((folder) =>
      folder.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterFolders();
  }

  openGithub() {
    window.open('https://github.com/AnshEzhava/SaveIt', '_blank');
  }

  addFolder() {
    this.navService.setActivePage('addFolder');
  }

  handleOpenLinks(folderName: string) {
    console.log(`Open links for ${folderName}`);
    // TODO: Implement logic to open links
  }

  handleAddLink(folderName: string) {
    localStorage.setItem('linkToFolder', folderName);
    this.navService.setActivePage('addLink');
  }

  handleDeleteFolder(folderName: string) {
    this.folderService.deleteFolderFromLocalStorage(folderName);
  }
}
