import { Component, OnInit } from '@angular/core';
import { GithubSearchService } from '../../services/github-search.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-form-fields',
    templateUrl: './form-fields.component.html',
    styleUrls: ['./form-fields.component.styl'],
    providers: [GithubSearchService]
})
export class FormFieldsComponent implements OnInit {

    // fields
    repository = new FormControl();
    username = new FormControl();
    pageNumber = new FormControl(1);
    apiForm = new FormGroup({
        repository: this.repository,
        username: this.username,
        pageNumber: this.pageNumber,
    });

    // results
    repositories = [];
    repoTotalCount = undefined;
    repoID = undefined;

    // messages
    waiting = false;

    constructor(public GHsearch:GithubSearchService) {
        /***
        **  Input fields send request through GithubSearchService
        **  and the response lands in repositories array.
        ***/
        var
            dbTime = 1300, // milliseconds
            subFunc = repositories => {
                this.repositories = repositories.items;
                this.repoTotalCount = repositories.total_count;
                this.repoID = undefined;
                this.waiting = false;
            }
        ;
        this.apiForm.valueChanges
        .debounceTime(dbTime)
        .distinctUntilChanged()
        .switchMap(fields => {
            this.waiting = true;
            var searchType: "users" | "repositories" | "issues";

            if (this.repository.value) { searchType = 'repositories'; }
            else if (this.username.value) { searchType = 'users'; }
            else { return Observable.of({}); }

            /*    r:1, u:0/1, p:0/1 // repositories
            **    r:0, u:1,   p:0/1 // users
            **    r:0, u:0,   p:0/1 // return immediately */
            return this.GHsearch.search({
                searchType:searchType,
                page: fields.pageNumber,
                username: fields.username,
                repository: fields.repository
            })
        })
        .subscribe(subFunc);
    }

    ngOnInit() {}

    searchOpenedIssues(repo) {
        /** Request the repo's issues from github. Fill in the repo.issues list when done.*/
        var
            repoName = repo['name'],
            userName = repo['owner']['login'],
            {id} = repo
        ;
        this.GHsearch.search({
            searchType: 'issues',
            repository: repoName,
            username: userName
        })
        .subscribe(resp=>{
            repo.issues = resp.items; // repo.issues is CREATED here
            repo.open_issues_count = resp.total_count;
            this.repoID = id;
        })
        ;
    }
}
