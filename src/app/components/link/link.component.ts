import { Component, Input } from '@angular/core';
import { FolderService, Link } from '../../services/folder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  @Input() folderName: string = '';
  links: Link[] = [];
  constructor(private folderService: FolderService) {}

  ngOnInit() {
    this.links = this.folderService.getLinksForFolder(this.folderName);
  }
}
