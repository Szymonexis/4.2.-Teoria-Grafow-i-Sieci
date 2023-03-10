import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost',
})
export class CostPipe implements PipeTransform {
  transform(value: number) {
    switch (value) {
      case 69:
        return `${value} - nice :3`;
      case 42:
        return `${value} - meaning of life`;
      case Number.POSITIVE_INFINITY:
        return '∞';
      default:
        return value;
    }
  }
}
