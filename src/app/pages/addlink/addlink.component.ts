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

  constructor(
    private navService: NavService,
    private folderService: FolderService
  ) {}

  addLinkToFolder(linkTitle: string, linkURL: string) {
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
}
