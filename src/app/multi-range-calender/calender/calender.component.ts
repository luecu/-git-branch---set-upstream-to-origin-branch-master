import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Month, Day, DayEvent } from '../multi-range-calender/multi-range-calender-types';


@Component({
  selector: 'calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input("month") month: Month;
  @Output("dayClick") dayClick: EventEmitter<DayEvent> = new EventEmitter();
  @Output('dayHover') dayHover: EventEmitter<DayEvent> = new EventEmitter();


  public weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  public bufferDaysStart: any[];

  constructor() { }

  ngOnInit() {
    let bufferSizeStart = this.month.firstDay().date.day() - 1;
    this.bufferDaysStart = bufferSizeStart === -1 ? [] : new Array(bufferSizeStart).fill(1);
  }

  public dayClicked(day: Day, event: MouseEvent) {
    event.preventDefault();
    this.dayClick.emit({day, event} as DayEvent);
  }

  public dayHovered(day: Day, event: MouseEvent) {
    this.dayHover.emit({day, event} as DayEvent);
  }

  public cssClass(day: Day) {
    if (day.previewSelected === true) return 'selected-preview';
    if (day.previewSelected === false) return 'unselected-preview';
    if (day.selected) return 'selected';
    return '';
  }

}
