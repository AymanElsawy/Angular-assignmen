import { CoursesService } from './../../services/courses.service';
import { Component, ElementRef, ViewChild, Renderer2, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { Course } from '../../models/course.interface';

import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule, SafeUrlPipe, CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  videoUrl: string = '';
  course !: Course;


  @ViewChild('imageOverlay', { static: true }) imageOverlay!: ElementRef; // Thumbnail
  @ViewChild('frame', { static: true }) frame!: ElementRef; // Video
  @ViewChild('btn', { static: true }) btn!: ElementRef; // Play button

  currentDate!: Date;
  // endDate = new Date(2024, 1, 15);
  // dateDifference = 0;
  // hours = 0;
  // minutes = 0;
  // seconds = 0;
  // timerSubscription!: Subscription ;


  private coursesService = inject(CoursesService);
  private renderer = inject(Renderer2); // Inject renderer

  ngOnInit() {
    this.getCourseDetails(); // Get course details
    //this makes memory lake


    // this.calcEndDate();
    // const timer = interval(1000);
    //  this.timerSubscription = timer.pipe(map(() => this.calcEndDate())).subscribe()
  }

  // ngOnDestroy() {
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }
  // }
  // calcEndDate() {
  //   this.currentDate = new Date();
  //   this.dateDifference = this.endDate.getTime() - this.currentDate.getTime();
  //   this.hours = Math.floor(this.dateDifference / (1000 * 60 * 60) % 24);
  //   this.minutes = Math.floor((this.dateDifference % (1000 * 60 * 60)) / (1000 * 60));
  //   this.seconds = Math.floor((this.dateDifference % (1000 * 60)) / 1000);

  // }



  discountPrice(price: string, discount: string) { // calculate discount price
    if (discount && price) {
      const priceNumericValue = parseFloat(price.replace('₹', '')); // remove '₹' symbol
      const discountNumericValue = parseFloat(discount.replace('%', '')); // remove '%' symbol
      return discountNumericValue === 0 ? price : '₹' + (priceNumericValue - (priceNumericValue * discountNumericValue) / 100).toFixed(2); // calculate discount
    }
    return null
  }


  getCourseDetails() {
    this.coursesService.courseDetails.subscribe(data => { // Get course details
      this.course = data;
    })
  }
  playVideo() {
    this.renderer.addClass(this.imageOverlay.nativeElement, 'd-none'); // Remove thumbnail
    this.renderer.addClass(this.btn.nativeElement, 'd-none'); // Remove play button
    this.renderer.removeClass(this.frame.nativeElement, 'd-none'); // Show video
    this.renderer.addClass(this.frame.nativeElement, 'd-block'); // Show video
    this.videoUrl = 'https://www.youtube.com/embed/DBjPIabiRNg?autoplay=1&mute=1'; // Play video
  }





}
