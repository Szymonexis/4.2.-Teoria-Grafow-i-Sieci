import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'easterEgg',
})
export class EasterEggPipe implements PipeTransform {
  transform(value: number) {
    switch (value) {
      case 69:
        return `${value} - nice :3`;
      case 42:
        return `${value} - meaning of life`;
      default:
        return value;
    }
  }
}
