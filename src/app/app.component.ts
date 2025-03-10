import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FolderComponent } from './components/folder/folder.component';
import { AddfolderComponent } from './pages/addfolder/addfolder.component';
import { NavService } from './services/nav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FolderComponent, AddfolderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private navService: NavService) {}
  activePage: string = 'folders';
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.navService.activePage$.subscribe((page) => {
      this.activePage = page;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openGithub() {
    window.open('https://github.com/AnshEzhava/SaveIt', '_blank');
  }

  addFolder() {
    this.navService.setActivePage('addFolder');
  }
}
