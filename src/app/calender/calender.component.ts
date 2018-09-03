import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Month, Day, DayClickEvent } from '../multi-range-calender/multi-range-calender-types';


@Component({
  selector: 'calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  public weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  @Input("month") month: Month;
  @Output("dayClick") dayClick: EventEmitter<DayClickEvent> = new EventEmitter();

  public bufferDaysStart: any[];

  constructor() { }

  ngOnInit() {
    console.log("month", this.month);

    let bufferSizeStart = this.month.firstDay().date.day() - 1;
    this.bufferDaysStart = new Array(bufferSizeStart).fill(1);
    
  }

  public dayClicked(day: Day, event: MouseEvent) {
    event.preventDefault();
    this.dayClick.emit({day, event} as DayClickEvent);
  }

}
