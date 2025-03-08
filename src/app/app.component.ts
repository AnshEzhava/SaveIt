import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FolderComponent } from './components/folder/folder.component';
import { AddfolderComponent } from './pages/addfolder/addfolder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FolderComponent, AddfolderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  activePage: string = 'folders';
  openGithub() {
    window.open('https://github.com/AnshEzhava/SaveIt', '_blank');
  }

  addFolder() {
    this.activePage = 'addFolder';
  }
}
