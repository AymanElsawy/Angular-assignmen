import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private http = inject(HttpClient); // inject http client
  private cooki = inject(CookieService); // inject cookie service



  //init
  coursesInCartCookies = this.cooki.get('cart') ? JSON.parse(this.cooki.get('cart')) : [];// get courses in cart from cookies or empty array
  coursesInWishListCookies = this.cooki.get('wish') ? JSON.parse(this.cooki.get('wish')) : []; // get courses in wish list from cookies or empty array

  private coursesInCart: Course[] = this.coursesInCartCookies;
  courseToCart = new BehaviorSubject<Course[]>(this.coursesInCart); // subject for courses in cart

  private coursesInWishList: Course[] = this.coursesInWishListCookies;
  courseToWishList = new BehaviorSubject<Course[]>(this.coursesInWishList); // subject for courses in wish list


  // get all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('assets/JSON/data.json');
  }

  // add course to cart
  addCourseToCart(course: Course): boolean {
    const isCourseInTheCart = this.coursesInCart.find(c => c.courseName === course.courseName); // check if course in cart
    if (!isCourseInTheCart) { // if not in cart
      this.coursesInCart.push(course); // add course
      // localStorage.setItem('cart', JSON.stringify(this.coursesInCart)); // store courses in cart in local storage
      this.cooki.set('cart', JSON.stringify(this.coursesInCart)); // store courses in cart in cookie service
      this.courseToCart.next(this.coursesInCart); // update subject
      return true;
    }
    return false;
  }

  // remove course from cart
  removeFromCart(course: Course) {
    this.coursesInCart = this.coursesInCart.filter(c => c.courseName !== course.courseName); // remove course
    this.courseToCart.next(this.coursesInCart); // update subject
  }

  // add course to wish list
  addToWishList(course: Course) {
    const isCourseInTheWishList = this.coursesInWishList.find(c => c.courseName === course.courseName); // check if course in wish list
    if (!isCourseInTheWishList) { // if not in wish list
      this.coursesInWishList.push(course); // add course
      // localStorage.setItem('wish', JSON.stringify(this.coursesInWishList)); // store courses in cart in local storage
      this.cooki.set('wish', JSON.stringify(this.coursesInWishList)); // store courses in cart in cookie service
      this.courseToWishList.next(this.coursesInWishList); // update subject
      return true;
    }
    return false;
  }

  // remove course from wish list
  removeFromWishList(course: Course) {
    this.coursesInWishList = this.coursesInWishList.filter(c => c.courseName !== course.courseName); // remove course
    this.courseToWishList.next(this.coursesInWishList); // update subject
  }
}
