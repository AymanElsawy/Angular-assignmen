import { Component, inject } from '@angular/core';
import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-widget',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.css'
})
export class CartWidgetComponent {
  coursesInCart: Course[] = []; // to store courses in cart

  private courserService = inject(CoursesService); // inject service
  private toasterService = inject(ToastrService); // inject toaster service
  ngOnInit() {
    this.getCoursesInCart(); // get courses in cart
  }
  getCoursesInCart() {
    this.courserService.courseToCart.subscribe({
      next: (data) => {
        this.coursesInCart = data; // get courses in cart
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeFromCart(course: Course) {
    this.courserService.removeFromCart(course); // remove course from cart
    this.toasterService.success('Course successfully removed from the cart', 'Success');
  }

  totalPrice() { // calculate total price
    let total = 0; // initialize total price
    if (this.coursesInCart.length > 0) { // if courses in cart
      this.coursesInCart.forEach(course => {
        const priceNumericValue = parseFloat(course.actualPrice.replace('₹', '')); // remove '₹' symbol
        const discountNumericValue = parseFloat(course.discountPercentage.replace('%', '')); // remove '%' symbol
        const priceAfterDiscount = discountNumericValue === 0 ? priceNumericValue : Number((priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2)); // calculate discount
        total += priceAfterDiscount; // add price
      })
      return '₹' + total // return total price
    }
    return null // return null if no courses in cart
  }
}
