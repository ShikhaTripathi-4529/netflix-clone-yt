import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {

  transform(value: unknown, maxLength: number = 140): string {
    // Ensure `value` is a string before applying substring
    if (typeof value === 'string') {
      return value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;
    }
    
    // Return an empty string if `value` is not a string
    return '';
  }

}
