import { Component } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-addfolder',
  standalone: true,
  imports: [],
  templateUrl: './addfolder.component.html',
  styleUrl: './addfolder.component.css',
})
export class AddfolderComponent {
  constructor(private navService: NavService) {}
  handleGoBack() {
    this.navService.setActivePage('folders');
  }
}
