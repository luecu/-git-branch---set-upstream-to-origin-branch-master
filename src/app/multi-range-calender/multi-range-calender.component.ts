import { Component, OnInit, Input, ModuleWithComponentFactories } from '@angular/core';
import { Day, Month } from './multi-range-calender-types';

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

  ngOnInit() {
    console.log(this.startMonth, this.nrOfCalenders);
    this.initDays();
  }

  public dayClick(day: Day) {
    day.selected = true;
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
    console.log(startDay, endDay);
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
    return {
      date: date.toString(),
      selected: false
    } as Day
  }
  private initMonth(firstDayOfMonth: Moment): Month {
    return new Month(this.daysForMonth(firstDayOfMonth));
  }

}
