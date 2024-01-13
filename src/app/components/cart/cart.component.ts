import { ToastrService } from 'ngx-toastr';
import { Course } from '../../models/course.interface';
import { CoursesService } from './../../services/courses.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartCourses!: Course[]; // courses in cart
  totalCurrentPrice: number = 0;
  totalActualPrice: number = 0;



  private coursesService = inject(CoursesService);// inject courses service
  private toasterService = inject(ToastrService); // inject toaster service



  ngOnInit() {
    this.getCartCourses(); // get courses in cart
  }


  getCartCourses() {
    this.coursesService.courseToCart.subscribe(data => { // get courses in cart
      this.cartCourses = data;
    })
  }

  moveToWishList(course: Course) {
    this.coursesService.addToWishList(course); // add course to wish list
    this.coursesService.removeFromCart(course); // remove course from cart
    this.toasterService.success('Course successfully added in the wish list', 'Success');
  }
  removeFromCart(course: Course) {
    this.coursesService.removeFromCart(course); // remove course from cart
    this.toasterService.success('Course successfully removed from the cart', 'Success');
  }

  discountPrice(price: string, discount: string) { // calculate discount price
    const priceNumericValue = parseFloat(price.replace('₹', '')); // remove '₹' symbol
    const discountNumericValue = parseFloat(discount.replace('%', '')); // remove '%' symbol
    return discountNumericValue === 0 ? price : '₹' + (priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2); // calculate discount
  }

  getTotalActualPrice() { // calculate total price
    let total = 0; // initialize total price
    if (this.cartCourses.length > 0) { // if courses in cart
      this.cartCourses.forEach(course => {
        const priceNumericValue = parseFloat(course.actualPrice.replace('₹', '')); // remove '₹' symbol

        total += priceNumericValue; // add price
        this.totalActualPrice = parseFloat(total.toFixed(2)); // assign total to total price to calc saving
      })
      return '₹' + total // return total price
    }
    return null // return null if no courses in cart
  }
  getTotalPrice() { // calculate total price
    let total = 0; // initialize total price
    if (this.cartCourses.length > 0) { // if courses in cart
      this.cartCourses.forEach(course => {
        const priceNumericValue = parseFloat(course.actualPrice.replace('₹', '')); // remove '₹' symbol
        const discountNumericValue = parseFloat(course.discountPercentage.replace('%', '')); // remove '%' symbol
        const priceAfterDiscount = discountNumericValue === 0 ? priceNumericValue : Number((priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2)); // calculate discount
        total += priceAfterDiscount; // add price
        this.totalCurrentPrice = parseFloat(total.toFixed(2)); // assign total to total price to calc saving
      })
      return '₹' + total // return total price
    }
    return null // return null if no courses in cart
  }

  checkOut() {
    this.coursesService.emptyCart(); // empty cart
  }
}
