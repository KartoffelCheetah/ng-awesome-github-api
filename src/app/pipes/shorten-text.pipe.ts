import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

    transform(value: string, len:number=80): string {
        if (value.length>len) {
            return value.slice(0,len)+'...';
        } else {
            return value;
        }
    }

}
