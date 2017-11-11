import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { GhpageCountPipe } from './form-fields/ghpage-count.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormFieldsComponent,
    GhpageCountPipe
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
