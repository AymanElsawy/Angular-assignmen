import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(array: Course[], term: any): any[] {
    if (term == undefined) {
      return array
    }
    return array.filter((array: Course) => {
      if (array.courseName.toLowerCase().includes(term.toLowerCase())) {
        return 1
      } else if (array.author.toLowerCase().includes(term.toLowerCase())) {
        return 1
      } else if (array.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))) {
        return 1
      }
      else {
        return 0
      }
    }
    )
  }

}
