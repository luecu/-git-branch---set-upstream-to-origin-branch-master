import { Component, OnInit, Input, ModuleWithComponentFactories } from '@angular/core';
import { Day, Month, DayClickEvent } from './multi-range-calender-types';

import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'multi-range-calender',
  templateUrl: './multi-range-calender.component.html',
  styleUrls: ['./multi-range-calender.component.css']
})
export class MultiRangeCalenderComponent implements OnInit {

  @Input("month") startMonth: string;
  @Input("nrOfCalenders") nrOfCalenders: number = 1;

  private days: Day[] = [];
  private months: Month[] = [];

  private lastSelected: Day;

  ngOnInit() {
    this.initDays();
  }

  public dayClick(clickEvent: DayClickEvent) {
    if (clickEvent.event.shiftKey && this.lastSelected) {
      this.selectRange(this.lastSelected, clickEvent.day, this.lastSelected.selected);
      this.lastSelected = undefined;
      return;
    }

    this.toggleDay(clickEvent.day);
    this.lastSelected = clickEvent.day;
  }

  private selectRange(day1: Day, day2: Day, selected: boolean = true) {
    this.daysBetween(day1, day2)
      .forEach((day: Day) => this.selectDay(day, selected));
  }

  private daysBetween(day1: Day, day2: Day): Day[] {
    return day1.date.isBefore(day2.date) ? 
      this.daysBetweenOrderSensitive(day1, day2) :
      this.daysBetweenOrderSensitive(day2, day1)
  }

  private daysBetweenOrderSensitive(day1: Day, day2: Day): Day[] {
    return this.days
            .filter((day: Day) => moment(day.date).isBetween(day1.date, day2.date, 'day', '[]'))
  }

  private toggleDay(day: Day) {
    this.selectDay(day, !day.selected)
  }
  private selectDay(day: Day, selected: boolean = true) {
    day.selected = selected;
  }

  private initDays() {
    let startDate = moment(this.startMonth).startOf('month');
    let endDate = moment(this.startMonth).add(this.nrOfCalenders-1, 'month').endOf('month');

    this.days = this.datesBetween(startDate.clone(), endDate.clone())
      .map(date => this.initDay(date))

    this.months = this.monthsBetween(startDate.clone(), endDate.clone())
  }

  private monthsBetween(startDay: Moment, endDay: Moment): Month[] {
    if (startDay.isSameOrAfter(endDay)) {
      throw "startDay is not allowed to be after endDate"
    }

    let result: Month[] = [];
    let currentMonth = startDay.startOf('month');
    while(currentMonth.isSameOrBefore(endDay, 'month')) {
      result.push(this.initMonth(currentMonth));
      currentMonth = currentMonth.clone().add(1, 'month');
    }
    return result;
  }

  private datesBetween(startDay: Moment, endDay: Moment): Moment[] {
    if (startDay.isSameOrAfter(endDay)) {
      throw "startDay is not allowed to be after endDate"
    }

    let result: Moment[] = []
    let currentDate = startDay;
    while(currentDate.isSameOrBefore(endDay)) {
      result.push(currentDate);
      currentDate = currentDate.clone().add(1, 'day');
    }
    return result;
  }

  private daysForMonth(month: Moment): Day[] {
    return this.days
      .filter((day: Day) => moment(day.date).isSame(month, 'month'));
  }

  private initDay(date: Moment): Day {
    return new Day(date, false);
  }
  private initMonth(firstDayOfMonth: Moment): Month {
    return new Month(firstDayOfMonth.format('MMMM'), this.daysForMonth(firstDayOfMonth));
  }

}
