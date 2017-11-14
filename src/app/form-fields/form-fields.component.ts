import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubSearchService } from './github-search.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css'],
  providers: [GithubSearchService]
})
export class FormFieldsComponent implements OnInit {

  constructor(
    public GHsearch:GithubSearchService,
    public cdr:ChangeDetectorRef) {
    /***
    **  Input fields send request through GithubSearchService
    **  and the response lands in repositories array.
    ***/

      var
        dbTime = 1000, // milliseconds
        subFunc = repositories => {
            this.repositories = repositories.items;
            this.repoIndex = undefined;
            this.repoTotalCount = repositories.total_count;
            this.waiting = false;
        }

    //   username
      this.username.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(uname => {
          this.waiting = true;
          if (this.repository.value) {
              return this.GHsearch.search({
                  searchType: 'repositories',
                  page: this.pageNumber.value,
                  repository: this.repository.value,
                  username: uname
          })} else {
              return this.GHsearch.search({
                  searchType: 'users',
                  page: this.pageNumber.value,
                  username: uname
          })}
      })
      .subscribe(subFunc)
    //   repository name
      this.repository.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(repo => {
          this.waiting = true;
          return this.GHsearch.search({
              searchType: 'repositories',
              page: this.pageNumber.value,
              repository: repo,
              username: this.username.value
          })
      })
      .subscribe(subFunc)
    //   page number
      this.pageNumber.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(pg => {
          this.waiting = true;
          if (this.repository.value) {
              return this.GHsearch.search({
                  searchType: 'repositories',
                  page: pg,
                  repository: this.repository.value,
                  username: this.username.value
          })} else {
              return this.GHsearch.search({
                  searchType: 'users',
                  page: pg,
                  username: this.username.value
          })}
      })
      .subscribe(subFunc)
   }

  ngOnInit() {
  }

  // fields
  repository = new FormControl();
  username = new FormControl();
  pageNumber = new FormControl(1);

  // results
  repositories = [];
  issues = [];
  repoIndex = undefined;
  repoTotalCount = undefined;

  // messages
  waiting = false;

  // functions
  searchOpenedIssues (repository:string, username:string, index:number) {
      /***
      **  This function searches issues for the index. repository
      ***/
      this.GHsearch.search({
          searchType: 'issues',
          page: 1,
          repository: repository,
          username: username
      })
      .subscribe(resp=>{
          this.issues = resp.items;
          this.repoIndex = index;
          this.cdr.detectChanges();
      })
      ;
  }
}
