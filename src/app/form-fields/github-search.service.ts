import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Http, Response } from '@angular/http';

@Injectable()
export class GithubSearchService {

  constructor( public http:Http ) { }
  search(repository:string, username:string) {

      username = username ? `repo:${username}/` : '' ;

      var par = new URLSearchParams();
      par.set('q', username+repository);

      return this.http
      .get(`https://api.github.com/search/repositories`, { search: par })
      .map((resp:Response)=>resp.json())
      .catch(err=>{
          console.log(err);
          return Observable.of({});
      })
      ;
  }
}
