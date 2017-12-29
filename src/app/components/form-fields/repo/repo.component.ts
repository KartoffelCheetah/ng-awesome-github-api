import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-repo',
    templateUrl: './repo.component.html',
    styleUrls: ['./repo.component.styl']
})
export class RepoComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    @Input() repo:any;
    @Input() repoID:string;
    @Input() searchOpenedIssues:any;

}
