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
              return this.GHsearch.search(
                  false,
                  1,
                  this.repository.value,
                  uname
          )} else {
              return Observable.of({});
          }
      })
      .subscribe(subFunc)
    //   repository name
      this.repository.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(repo => {
          this.waiting = true;
          return this.GHsearch.search(
              false,
              1,
              repo,
              this.username.value
          );
      })
      .subscribe(subFunc)
    //   page number
      this.pageNumber.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(pg => {
          this.waiting = true;
          if (this.repository.value) {
              return this.GHsearch.search(
                  false,
                  pg,
                  this.repository.value,
                  this.username.value
          )} else {
              return Observable.of({});
          }
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
      this.GHsearch.search(true, 1, repository, username)
      .subscribe(resp=>{
          this.issues = resp.items;
          this.repoIndex = index;
          this.cdr.detectChanges();
      })
      ;
  }
}
