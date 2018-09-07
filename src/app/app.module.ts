import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MultiRangeCalenderModule} from './multi-range-calender/multi-range-calender.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MultiRangeCalenderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
