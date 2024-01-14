import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    // component:HomeComponent
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cart',
    // component:CartComponent
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'wish-list',
    loadComponent: () => import('./components/wish-list/wish-list.component').then(m => m.WishListComponent)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./components/course-details/course-details.component').then(m => m.CourseDetailsComponent)
  }
];
