import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class GithubSearchService {

  constructor( public http:Http ) { }
  search(issues:boolean, page:number, repository:string, username:string) {

      username = username ? `repo:${username}/` : '' ;

      var q = `?q=${username}${repository}`;

      var link = issues
      ?`https://api.github.com/search/issues${q}+is:open&page=${page}`
      :`https://api.github.com/search/repositories${q}&page=${page}`
      ;

      return this.http
      .get(link)
      .map((resp:Response)=>resp.json())
      .catch(err=>{
          if (err.json && err.json().message) {
            alert(err.json().message);
        } else {
            alert(err);
        }

          return Observable.of({});
      })
      ;
  }
}
