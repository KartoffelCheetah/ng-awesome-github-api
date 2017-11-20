import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

interface GitHubReq {
    searchType: 'users'|'repositories'|'issues',
    page?: number,
    repository?: string,
    username?: string
}

@Injectable()
export class GithubSearchService {

    constructor( public http:Http ) { }
    search(req: GitHubReq) {

        var
            link = "https://api.github.com/search/"+req.searchType,
            params: any = {};
        // defaults
        if (!req.page) req.page=1;
        if (!req.repository) req.repository='';
        if (!req.username) req.username='';

        switch (req.searchType) {
            case 'issues':
                params.q =
                req.username
                ? 'repo:'+req.username+'/'+req.repository+'+is:open'
                : req.username+req.repository+'+is:open'
                ;
                params.page=req.page;
                break;
            case 'repositories':
                params.q =
                req.username
                ? 'repo:'+req.username+'/'+req.repository
                : req.username+req.repository
                ;
                params.page=req.page;
                break;
            case 'users':
                link = `https://api.github.com/${req.searchType}/${req.username}/repos`;
                params.page=req.page;
                break;
            default:
                return;
        }

        return this.http
        .get(link, {params:params})
        .map((resp:Response)=>{
            switch (req.searchType) {
                case 'issues':
                    return resp.json();
                case 'repositories':
                    return resp.json();
                case 'users':
                    var jSON = resp.json();
                    return {
                        items: jSON,
                        total_count: jSON.length
                    };
            }
        })
        .catch(err=>{
            //   check if err message arrived
            if (err.json && err.json().message) {
                //   check if err message is not in list
                if (
                    ["Validation Failed", "Not Found"]
                    .indexOf(err.json().message) === -1
                ){
                    alert(err.json().message);
                } else {
                    //   err message was in list
                }
            } else {
                alert(err);
            }

            return Observable.of({});
        })
        ;
    }
}
