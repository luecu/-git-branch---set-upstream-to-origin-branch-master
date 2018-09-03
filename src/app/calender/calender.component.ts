import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Month, Day } from '../multi-range-calender/multi-range-calender-types';


@Component({
  selector: 'calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input("month") month: Month;
  @Output("dayClick") dayClick: EventEmitter<Day> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log("month", this.month);
  }

  public dayClicked(day: Day) {
    console.log("day clicked", day);
    this.dayClick.emit(day);
  }

}
