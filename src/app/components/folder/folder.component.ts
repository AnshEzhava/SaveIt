import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FolderService, Folder, Link } from '../../services/folder.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule, FormsModule, LinkComponent],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css',
})
export class FolderComponent implements OnInit, OnDestroy {
  folders: Folder[] = [];
  newLink: Link = { title: '', url: '' };
  private subscription: Subscription | undefined;

  @Input() folderName: string = '';
  @Output() openLinksEvent = new EventEmitter<string>();
  @Output() addLinkEvent = new EventEmitter<string>();
  @Output() deleteFolderEvent = new EventEmitter<string>();

  isExpanded: boolean = false;

  constructor(private folderService: FolderService) {}

  ngOnInit(): void {
    this.subscription = this.folderService.folders$.subscribe((folders) => {
      this.folders = folders;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  expandFolder() {
    this.isExpanded = !this.isExpanded;
  }

  openLinks() {
    this.openLinksEvent.emit(this.folderName);
  }

  addLink() {
    this.addLinkEvent.emit(this.folderName);
  }

  deleteFolder() {
    this.deleteFolderEvent.emit(this.folderName);
  }

  handleOpenLinks(folderName: string) {
    this.openLinksEvent.emit(folderName);
  }

  handleAddLink(folderName: string) {
    this.addLinkEvent.emit(folderName);
  }

  handleDeleteFolder(folderName: string) {
    this.deleteFolderEvent.emit(folderName);
  }
}
