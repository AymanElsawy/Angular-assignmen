import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.interface';

@Pipe({
  name: 'sortName',
  standalone: true
})
export class SortNamePipe implements PipeTransform {

  transform(array: Course[], CourseName: string): any[] {
    return CourseName ?
    array.sort((a: any, b: any) => {
      if (a[CourseName][0] < b[CourseName][0]) {
        return -1;
      } else if (a[CourseName][0] > b[CourseName][0]) {
        return 1;
      } else {
        return 0;
      }
    }): array
    return array;
  }

}
