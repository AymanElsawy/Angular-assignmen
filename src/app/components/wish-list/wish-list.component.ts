import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {


  wishListCourses!: Course[]; // courses in cart

  private coursesService = inject(CoursesService);// inject courses service
  private toasterService = inject(ToastrService); // inject toaster service



  ngOnInit() {
    this.getCartCourses(); // get courses in cart
  }


  getCartCourses() {
    this.coursesService.courseToWishList.subscribe(data => { // get courses in cart
      this.wishListCourses = data;
      console.log(this.wishListCourses);
    })
  }

  moveToCart(course: Course) {
    this.coursesService.addCourseToCart(course); // add course to wish list
    this.coursesService.removeFromWishList(course); // remove course from cart
    this.toasterService.success('Course successfully added in the wish list', 'Success');
  }
  removeFromWishList(course: Course) {
    this.coursesService.removeFromWishList(course); // remove course from cart
    this.toasterService.success('Course successfully removed from the cart', 'Success');
  }

  discountPrice(price: string, discount: string) { // calculate discount price
    const priceNumericValue = parseFloat(price.replace('₹', '')); // remove '₹' symbol
    const discountNumericValue = parseFloat(discount.replace('%', '')); // remove '%' symbol
    return discountNumericValue === 0 ? price : '₹' + (priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2); // calculate discount
  }




  checkOut() {
    this.coursesService.emptyCart(); // empty cart
  }
}
