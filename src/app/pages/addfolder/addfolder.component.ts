import { Component, ElementRef, ViewChild } from '@angular/core';
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
  isInvalid: boolean = false;
  constructor(
    private navService: NavService,
    private folderService: FolderService
  ) {}

  createFolder(folderName: string) {
    if (this.isFolderNameEmpty()) {
      this.isInvalid = true;
      return;
    }
    this.folderService.addFolder(folderName);
    this.navService.setActivePage('folders');
  }
  handleGoBack() {
    this.navService.setActivePage('folders');
  }

  isFolderNameEmpty(): boolean {
    return this.folderName.trim() === '';
  }
}
