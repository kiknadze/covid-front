import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asThousandSeparator',
  pure: true,
  standalone: true
})
export class ThousandSeparatorPipe implements PipeTransform {
    transform(value: number | string): string {
      if (value === 0) {
        return '0';
      }

      if (value === undefined || value === null) {
        return '';
      }
      if (!Number(value)) {
        return value.toString();
      }

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
}
