import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private activePageSubject = new BehaviorSubject<string>('folders');
  activePage$ = this.activePageSubject.asObservable();

  setActivePage(page: string) {
    this.activePageSubject.next(page);
  }
}
