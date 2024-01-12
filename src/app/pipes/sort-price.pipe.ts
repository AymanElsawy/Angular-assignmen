import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.interface';

@Pipe({
  name: 'sortPrice',
  standalone: true
})
export class SortPricePipe implements PipeTransform {

  transform(array: any[], actualPrice: string): any[] {
    if (!array || !actualPrice) {
      return array;
    }
    return array.slice().sort((a, b) => {
      const priceA = parseFloat(a[actualPrice].replace('₹', ''));
      const priceB = parseFloat(b[actualPrice].replace('₹', ''));
      if (priceA < priceB) {
        return -1;
      } else if (priceA > priceB) {
        return 1;
      } else {
        return 0;
      }
    });

  }
}
