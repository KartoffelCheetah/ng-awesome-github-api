import { Component, Input } from '@angular/core';
import { AppError } from '../../../common/app-error';

@Component({
    selector: 'problemo',
    templateUrl: './problemo.component.html',
    styleUrls: ['./problemo.component.styl']
})
export class ProblemoComponent {
    errors: AppError[] = [];

    @Input('error')
    set error(error){
        if(!error) return
        this.errors.push(error);
        setTimeout(
            ()=>{ this.deleteError(error) }
            ,10000)
    }

    deleteError(error) {
        let index = this.errors.indexOf(error);
        this.errors.splice(index, 1);
    }

}
