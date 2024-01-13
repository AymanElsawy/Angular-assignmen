import { Component, Input, inject } from '@angular/core';
import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input({ required: true, alias: 'course' }) course!: Course; // get course from parent component
  inWishList: boolean = false;
  wishList!: Course[] ;

  private coursesService = inject(CoursesService); // inject courses service
  private toasterService = inject(ToastrService); // inject toaster service

  ngOnInit() {
    this.getWishListCourses(); // get wish list courses
  }
  getWishListCourses() {
    this.coursesService.courseToWishList.subscribe(wishList => {
      this.wishList = wishList;
    })
  }

  discountPrice(price: string, discount: string) { // calculate discount price
    const priceNumericValue = parseFloat(price.replace('₹', '')); // remove '₹' symbol
    const discountNumericValue = parseFloat(discount.replace('%', '')); // remove '%' symbol
    return discountNumericValue === 0 ? price : '₹' + (priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2); // calculate discount
  }


  addToCart(course: Course) {
    const addCourse = this.coursesService.addCourseToCart(course); // add course to cart
    addCourse ? this.toasterService.success('Course successfully added in the cart', 'Success') : this.toasterService.warning('Already exists in the cart');
  }
  addToWishList(course: Course) {
    this.coursesService.addToWishList(course); // add course to wish list
    this.toasterService.success('Course successfully added in the wish list', 'Success');

    this.wishList.push(course);
  }
  removeFromWishList(course: Course) {
    this.coursesService.removeFromWishList(course); // remove course from wish list
    this.toasterService.success('Course successfully removed from the wish list', 'Success');

    this.wishList = this.wishList.filter(c => c.courseName !== course.courseName);
  }
  checkInWishList() {
   return this.inWishList = this.wishList.some(c => c.courseName === this.course.courseName);
  }

}
