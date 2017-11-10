import { Component, OnInit } from '@angular/core';
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

  constructor(public GHsearch:GithubSearchService) {
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
                  this.repository.value,
                  uname
          )} else {
              return Observable.of({});
          }
      })
      .subscribe(repositories => this.repositories = repositories.items)
    //   repository name
      this.repository.valueChanges
      .debounceTime(dbTime)
      .distinctUntilChanged()
      .switchMap(repo => this.GHsearch.search(
          repo,
          this.username.value
      ))
      .subscribe(repositories => this.repositories = repositories.items)
   }

  ngOnInit() {
  }

  // fields
  repository = new FormControl();
  username = new FormControl();

  // results
  repositories = [];

}
