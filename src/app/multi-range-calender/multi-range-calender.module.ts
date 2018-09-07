import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiRangeCalenderComponent} from './multi-range-calender/multi-range-calender.component';
import {CalenderComponent} from './calender/calender.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MultiRangeCalenderComponent,
    CalenderComponent
  ],
  exports: [MultiRangeCalenderComponent]
})
export class MultiRangeCalenderModule { }
