import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ghpageCount'
})
export class GhpageCountPipe implements PipeTransform {

    transform(value: number, args?: any): number {
        return Math.ceil(value/30) || 0;
    }

}
