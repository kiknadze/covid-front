import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentOrPx',
  pure: true,
  standalone: true
})
export class PercentOrPxPipe implements PipeTransform {
    transform(value: string | number): string | number {
        return Boolean(Number(value)) ? value + 'px' : value;
    }
}
