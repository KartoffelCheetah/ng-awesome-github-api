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

      var // milliseconds
        dbTime = 1000;

    //   username
      this.username.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(uname => {
          if (this.repository.value) {
              return this.GHsearch.search(
                  false,
                  this.repository.value,
                  uname
          )} else {
              return Observable.of({});
          }
      })
      .subscribe(repositories => {
          this.repositories = repositories.items;
          this.repoIndex = undefined;
      })
    //   repository name
      this.repository.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(repo => this.GHsearch.search(
          false,
          repo,
          this.username.value
      ))
      .subscribe(repositories => {
          this.repositories = repositories.items;
          this.repoIndex = undefined;
      })
   }

  ngOnInit() {
  }

  // fields
  repository = new FormControl();
  username = new FormControl();

  // results
  repositories = [];
  issues = [];
  repoIndex = undefined;

  searchOpenedIssues (repository:string, username:string, index:number) {
      /***
      **  This function searches issues for the index. repository
      ***/
      this.GHsearch.search(true, repository, username)
      .subscribe(resp=>{
          this.issues = resp.items;
          this.repoIndex = index;
          this.cdr.detectChanges();
      })
      ;
  }
}
