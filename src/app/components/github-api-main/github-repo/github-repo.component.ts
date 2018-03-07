import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'github-repo',
    templateUrl: './github-repo.component.html',
    styleUrls: ['./github-repo.component.styl']
})
export class GithubRepoComponent implements OnInit {
    @Input('repo') repo:any;
    @Input('repoID') repoID:string;
    @Input('searchOpenedIssues') searchOpenedIssues:any;
    isIssueClosed:boolean = false;

    constructor() { }
    ngOnInit() { }
    onCloseIssue() {
        this.isIssueClosed = true;
    }

}
