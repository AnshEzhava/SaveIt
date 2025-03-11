import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Link {
  title: string;
  url: string;
}

export interface Folder {
  name: string;
  links: Link[];
}

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private foldersSubject = new BehaviorSubject<Folder[]>(
    this.getFoldersFromLocalStorage()
  );
  folders$ = this.foldersSubject.asObservable();
  constructor() {
    this.folders$.subscribe((folders) => {
      this.saveFoldersToLocalStorage(folders);
    });
  }

  addFolder(folderName: string) {
    const currentFolders = this.foldersSubject.getValue();
    const newFolder: Folder = { name: folderName, links: [] };
    this.foldersSubject.next([...currentFolders, newFolder]);
  }

  deleteFolderFromLocalStorage(folderName: string) {
    const currentFolders = this.foldersSubject.getValue();
    const updatedFolders = currentFolders.filter(
      (folder) => folder.name !== folderName
    );
    this.foldersSubject.next(updatedFolders);
  }

  saveFoldersToLocalStorage(folders: Folder[]) {
    localStorage.setItem('folders', JSON.stringify(folders));
  }

  getFoldersFromLocalStorage(): Folder[] {
    const storedFolders = localStorage.getItem('folders');
    return storedFolders ? JSON.parse(storedFolders) : [];
  }

  getLinksForFolder(folderName: string): Link[] {
    const currentFolders = this.foldersSubject.getValue();
    const folder = currentFolders.find((folder) => folder.name === folderName);
    return folder ? folder.links : [];
  }

  addLinksToFolder(folderName: string, link: Link) {
    const currentFolders = this.foldersSubject.getValue();
    const updatedFolders = currentFolders.map((folder) => {
      if (folder.name === folderName) {
        return { ...folder, links: [...folder.links, link] };
      }
      return folder;
    });
    this.foldersSubject.next(updatedFolders);
  }

  deleteLinksFromFolder(folderName: string, link: Link) {
    const currentFolders = this.foldersSubject.getValue();
    const updatedFolders = currentFolders.map((folder) => {
      if (folder.name === folderName) {
        return {
          ...folder,
          links: folder.links.filter(
            (currentLink) =>
              currentLink.title !== link.title && currentLink.url !== link.url
          ),
        };
      }
      return folder;
    });
    this.foldersSubject.next(updatedFolders);
  }
}
