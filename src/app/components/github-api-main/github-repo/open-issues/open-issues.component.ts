import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'open-issues',
    templateUrl: './open-issues.component.html',
    styleUrls: ['./open-issues.component.styl']
})
export class OpenIssuesComponent implements OnInit {
    // This component lists the Open Issues
    @Input('repo') repo;
    @Output('close-issue') closeMe = new EventEmitter();

    constructor() { }
    ngOnInit() { }
    onClose() {
        this.closeMe.emit();
    }

}
