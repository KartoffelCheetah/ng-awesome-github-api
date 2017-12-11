import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-repo',
    templateUrl: './repo.component.html',
    styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    @Input() repo:any;
    @Input() repoID:string;
    @Input() issues:any[];
    @Input() searchOpenedIssues:any;

}
