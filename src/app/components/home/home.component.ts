import { FormsModule } from '@angular/forms';
import { CartWidgetComponent } from '../cart-widget/cart-widget.component';
import { Course } from './../../models/course.interface';
import { CoursesService } from './../../services/courses.service';
import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortNamePipe } from '../../pipes/sort-name.pipe';
import { SortPricePipe } from '../../pipes/sort-price.pipe';
import { SearchPipe } from '../../pipes/search.pipe';
import { CourseCardComponent } from '../course-card/course-card.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CartWidgetComponent, NgxPaginationModule, FormsModule, SortNamePipe, SortPricePipe, SearchPipe, CourseCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  courses!: Course[];
  p: number = 1;
  itemPerPage: number = 4; // Items per page
  sortField: string = ''; // Sort field name
  search!: string; // Search term

  private CoursesService = inject(CoursesService); // Inject CoursesService


  ngOnInit() {
    this.getAllCourses(); // Get all courses
  }

  getAllCourses() {
    this.CoursesService.getAllCourses().subscribe({ // Get all courses
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.log(error); // Log error
      }
    });
  }






}
