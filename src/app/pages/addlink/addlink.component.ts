import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavService } from '../../services/nav.service';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-addlink',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addlink.component.html',
  styleUrl: './addlink.component.css',
})
export class AddlinkComponent {
  linkTitle: string = '';
  linkURL: string = '';
  isInvalid: boolean = false;

  constructor(
    private navService: NavService,
    private folderService: FolderService
  ) {}

  addLinkToFolder(linkTitle: string, linkURL: string) {
    if (linkTitle.trim() === '' || linkURL.trim() === '') {
      this.isInvalid = true;
      return;
    }
    const folderName = localStorage.getItem('linkToFolder') || '';
    const newLink = { title: linkTitle, url: linkURL };
    this.folderService.addLinksToFolder(folderName, newLink);
    this.navService.setActivePage('folders');
    localStorage.removeItem('linkToFolder');
  }
  handleGoBack() {
    this.navService.setActivePage('folders');
    localStorage.removeItem('linkToFolder');
  }
  handleCopyLink() {
    // TODO: impl logic
  }
}
