import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

// PIPES
import { GhpageCountPipe } from './pipes/ghpage-count.pipe';
// COMPONENTS
import { AppComponent } from './app.component';
import { FormFieldsComponent } from './components/form-fields/form-fields.component';
import { OpenIssuesComponent } from './components/form-fields/open-issues/open-issues.component';

@NgModule({
  declarations: [
    AppComponent,
    FormFieldsComponent,
    GhpageCountPipe,
    OpenIssuesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
