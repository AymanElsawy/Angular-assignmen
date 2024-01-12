import { Component, inject } from '@angular/core';
import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-cart-widget',
  standalone: true,
  imports: [],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.css'
})
export class CartWidgetComponent {
  courses: Course[] = []; // to store courses in cart

  private courserService = inject(CoursesService); // inject service

  ngOnInit() {
    this.getCoursesInCart(); // get courses in cart
  }
  getCoursesInCart() {
    this.courserService.courseToCart.subscribe({
      next: (data) => {
        this.courses = data; // get courses in cart
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeFromCart(course: Course) {
    this.courserService.removeFromCart(course); // remove course from cart
  }

  totalPrice() { // calculate total price
    let total = 0; // initialize total price
    if (this.courses.length > 0) { // if courses in cart
      this.courses.forEach(course => {
        const priceNumericValue = parseFloat(course.actualPrice.replace('₹', '')); // remove '₹' symbol
        const discountNumericValue = parseFloat(course.discountPercentage.replace('%', '')); // remove '%' symbol
        const priceAfterDiscount = discountNumericValue === 0 ? course.actualPrice : (priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2); // calculate discount
        total += parseFloat(priceAfterDiscount); // add price
      })
      return '₹' + total // return total price
    }
    return null // return null if no courses in cart
  }
}
