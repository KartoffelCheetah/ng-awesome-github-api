import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { UnprocessableEntityError } from '../common/unprocessable-entity-error';

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
        let {searchType, page, repository, username} = req;

        // defaults
        if (!page) page=1;
        if (!repository) repository='';
        if (!username) username='';

        var
            link = "https://api.github.com/search/"+searchType,
            params: any = { 'page': page };
        if (searchType === 'users')
            link = `https://api.github.com/${searchType}/${username}/repos`;

        // params.q based on request.searchType
        switch (searchType) {
            case 'issues':
                params.q =
                username
                ? 'repo:'+username+'/'+repository+'+is:open'
                : username+repository+'+is:open'
                ;
                break;
            case 'repositories':
                params.q =
                username
                ? 'repo:'+username+'/'+repository
                : username+repository
                ;
                break;
            case 'users':
                // do not add params.q at all
                break;
            default:
                return;
        }

        return this.http
        .get(link, {params:params})
        .map((resp:Response)=>{
            switch (searchType) {
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
        .catch(this.handleError);
    }
    handleError(error:Response) {
        console.log(error.status);
        console.log(error.json())
        if (error.status === 400)
            return Observable.of(new BadRequestError(error)); //something broke
        if (error.status === 422)
            return Observable.of(new UnprocessableEntityError(error)); //dont care or probably care tricky one
        if (error.status === 404)
            return Observable.of(new NotFoundError(error)); //dont care
        else
            return Observable.of(new AppError(error)); //something broke
    }
}
