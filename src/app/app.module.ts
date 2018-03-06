import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler } from '@angular/core';

// PIPES
import { GhpageCountPipe } from './pipes/ghpage-count.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
// COMPONENTS
import { AppComponent } from './app.component';
import { GithubApiMain } from './components/github-api-main/github-api-main.component';
import { OpenIssuesComponent } from './components/github-api-main/github-repo/open-issues/open-issues.component';
import { GithubRepoComponent } from './components/github-api-main/github-repo/github-repo.component';
// SERVICES
import { GithubSearchService } from './services/github-search.service';
import { AppErrorHandler } from './common/app-error-handler';

@NgModule({
    declarations: [
        AppComponent,
        GithubApiMain,
        GhpageCountPipe,
        OpenIssuesComponent,
        GithubRepoComponent,
        ShortenTextPipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
    ],
    providers: [
        GithubSearchService,
        { 'provide': ErrorHandler, 'useClass': AppErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
