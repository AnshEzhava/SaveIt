/// <reference types="chrome" />
// apparently this is needed for chrome.tabs.url to work...

import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
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
  displayURL: string = '';
  isInvalid: boolean = false;

  constructor(
    private navService: NavService,
    private folderService: FolderService,
    private ngZone: NgZone
  ) {}

  addLinkToFolder(linkTitle: string, linkURL: string) {
    if (linkTitle.trim() === '' || linkURL.trim() === '') {
      this.isInvalid = true;
      return;
    }
    const folderName = localStorage.getItem('linkToFolder') || '';
    const newLink = {
      title: this.folderService.displayTitleFormatter(linkTitle),
      url: linkURL,
      displayURL: this.folderService.displayURLFormatter(
        linkURL,
        this.displayURL
      ),
    };
    this.folderService.addLinksToFolder(folderName, newLink);
    this.navService.setActivePage('folders');
    localStorage.removeItem('linkToFolder');
  }
  handleGoBack() {
    this.navService.setActivePage('folders');
    localStorage.removeItem('linkToFolder');
  }
  handleCopyLink() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length && tabs[0].url && tabs[0].title) {
        this.ngZone.run(() => {
          this.linkURL = tabs[0].url || '';
          this.linkTitle = tabs[0].title || '';
        });
      }
    });
  }
}
