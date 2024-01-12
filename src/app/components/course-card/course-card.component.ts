import { Component, Input,  inject } from '@angular/core';
import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input({ required: true, alias: 'course' }) course!: Course; // get course from parent component

  private courserService = inject(CoursesService); // inject courses service

  discountPrice(price: string, discount: string) { // calculate discount price
    const priceNumericValue = parseFloat(price.replace('₹', '')); // remove '₹' symbol
    const discountNumericValue = parseFloat(discount.replace('%', '')); // remove '%' symbol
    return discountNumericValue === 0 ? price : '₹' + (priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2); // calculate discount
  }


  addToCart(course: Course) {
    this.courserService.addCourseToCart(course); // add course to cart
  }
}
