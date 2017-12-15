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
    GHform = new FormGroup({
        repository: this.repository,
        username: this.username,
        pageNumber: this.pageNumber,
    });

    // results
    repositories = [];
    repoTotalCount = undefined;
    repoID = undefined;
    issues = [];

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
        this.GHform.valueChanges
        .debounceTime(dbTime)
        .distinctUntilChanged()
        .switchMap(fields => {
            this.waiting = true;
            var searchType: "users" | "repositories" | "issues";
            if (this.repository.value) {
                //   r:1, u:0/1, p:0/1
                searchType = 'repositories';
            } else if (this.username.value) {
                //   r:0, u:1, p:0/1
                searchType = 'users';
            } else {
                //   r:0, u:0, p:0/1
                return Observable.of({});
            }
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
        // Searches issues of the repository with the id
        var
            repoName = repo['name'],
            userName = repo['owner']['login'],
            {id} = repo
        ;
        this.GHsearch.search({
            searchType: 'issues',
            page: 1,
            repository: repoName,
            username: userName
        })
        .subscribe(resp=>{
            this.issues = resp.items;
            this.repoID = id;
        })
        ;
    }
}
