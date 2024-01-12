import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Course } from '../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesInCart: Course[] = [];
  courseToCart = new Subject<Course[]>(); // subject for courses in cart

  private http = inject(HttpClient); // inject http client

  // get all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('assets/JSON/data.json');
  }

  // add course to cart
  addCourseToCart(course: Course) {
    const isCourseInTheCart = this.coursesInCart.find(c => c.courseName === course.courseName); // check if course in cart
   if(!isCourseInTheCart){ // if not in cart
    this.coursesInCart.push(course); // add course
    this.courseToCart.next(this.coursesInCart); // update subject
   }
  }

  // remove course from cart
  removeFromCart(course: Course) {
    this.coursesInCart = this.coursesInCart.filter(c => c.courseName !== course.courseName); // remove course
    this.courseToCart.next(this.coursesInCart); // update subject
  }
}
