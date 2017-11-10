import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class GithubSearchService {

  constructor( public http:Http ) { }
  search(issues:boolean, repository:string, username:string) {

      username = username ? `repo:${username}/` : '' ;

      var q = `?q=${username}${repository}`

      var link = issues
      ?`https://api.github.com/search/issues${q}+is:open`
      :`https://api.github.com/search/repositories${q}`
      ;

      return this.http
      .get(link)
      .map((resp:Response)=>resp.json())
      .catch(err=>{
          alert(err.json().message);
          return Observable.of({});
      })
      ;
  }
}
