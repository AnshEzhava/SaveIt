import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FolderComponent } from './components/folder/folder.component';
import { AddfolderComponent } from './pages/addfolder/addfolder.component';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FolderComponent, AddfolderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private navService: NavService) {}
  activePage: string = 'folders';
  openGithub() {
    window.open('https://github.com/AnshEzhava/SaveIt', '_blank');
  }

  addFolder() {
    console.log('add folder');
    this.navService.setActivePage('addfolder');
  }
}
