import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Folder {
  name: string;
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
    const newFolder: Folder = { name: folderName };
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
}
