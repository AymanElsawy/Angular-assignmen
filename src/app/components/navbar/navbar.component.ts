import { Component } from '@angular/core';
import { CloseMenuDirective } from '../../directives/close-menu.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CloseMenuDirective,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
