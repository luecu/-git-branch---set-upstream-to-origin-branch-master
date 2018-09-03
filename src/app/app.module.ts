import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiRangeCalenderComponent } from './multi-range-calender/multi-range-calender.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiRangeCalenderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
