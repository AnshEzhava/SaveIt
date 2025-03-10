import { Component } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { CommonModule } from '@angular/common';
import { FolderService } from '../../services/folder.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addfolder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addfolder.component.html',
  styleUrl: './addfolder.component.css',
})
export class AddfolderComponent {
  folderName: string = '';

  constructor(
    private navService: NavService,
    private folderService: FolderService
  ) {}

  createFolder(folderName: string) {
    this.folderService.addFolder(folderName);
    this.navService.setActivePage('folders');
  }
  handleGoBack() {
    this.navService.setActivePage('folders');
  }
}
