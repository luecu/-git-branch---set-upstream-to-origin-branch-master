import {Component, OnInit, Input, ModuleWithComponentFactories, Output, EventEmitter} from '@angular/core';
import {Day, Month, DayEvent} from './multi-range-calender-types';

import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'multi-range-calender',
  templateUrl: './multi-range-calender.component.html',
  styleUrls: ['./multi-range-calender.component.css']
})
export class MultiRangeCalenderComponent implements OnInit {

  @Input('month') startMonth: string;
  @Input('nrOfCalenders') nrOfCalenders: number = 1;
  @Output('daysSelect') daysSelect: EventEmitter<string[]> = new EventEmitter();

  private readonly EXPORT_FORMAT: string = 'DD-MM-YYYY';

  private days: Day[] = [];
  private months: Month[] = [];

  private lastSelected: Day;

  ngOnInit() {
    this.initDays();
  }

  public dayClick(dayEvent: DayEvent) {
    if (dayEvent.event.shiftKey && this.lastSelected) {
      this.selectRange(this.lastSelected, dayEvent.day, this.lastSelected.selected);
      this.lastSelected = undefined;
    } else {
      this.lastSelected = dayEvent.day;
      this.toggleDay(dayEvent.day);
    }

    this.emitDays();
    this.undoAnyPreviewSelections();
  }

  private undoAnyPreviewSelections(): void {
    this.days.forEach(day => day.previewSelected = undefined);
  }

  public dayHover(dayEvent: DayEvent) {
    this.undoAnyPreviewSelections(); // undo old previews
    if (dayEvent.event.shiftKey && this.lastSelected) {
      this.selectRangeAsPreview(this.lastSelected, dayEvent.day, this.lastSelected.selected);
    }
  }

  private emitDays() {
    const selectedDaysAsString = this.selectedDates().map((date: Moment) => date.format(this.EXPORT_FORMAT));
    this.daysSelect.emit(selectedDaysAsString);
  }

  private selectedDates(): Moment[] {
    return this.days
      .filter((day: Day) => day.selected)
      .map((day: Day) => day.date);
  }

  private selectRange(day1: Day, day2: Day, selected: boolean = true) {
    this.daysBetween(day1, day2)
      .forEach((day: Day) => this.selectDay(day, selected));
  }

  private selectRangeAsPreview(day1: Day, day2: Day, selected: boolean = true) {
    this.daysBetween(day1, day2)
      .forEach((day: Day) => this.selectDayAsPreview(day, selected));
  }

  private daysBetween(day1: Day, day2: Day): Day[] {
    return day1.date.isBefore(day2.date) ?
      this.daysBetweenOrderSensitive(day1, day2) :
      this.daysBetweenOrderSensitive(day2, day1);
  }

  private daysBetweenOrderSensitive(day1: Day, day2: Day): Day[] {
    return this.days
      .filter((day: Day) => moment(day.date).isBetween(day1.date, day2.date, 'day', '[]'));
  }

  private toggleDay(day: Day) {
    this.selectDay(day, !day.selected);
  }

  private selectDay(day: Day, selected: boolean = true) {
    day.selected = selected;
    day.previewSelected = undefined;
  }

  private selectDayAsPreview(day: Day, selected: boolean = true) {
    day.previewSelected = selected;
  }

  private initDays() {
    const startDate = moment(this.startMonth).startOf('month');
    const endDate = moment(this.startMonth).add(this.nrOfCalenders - 1, 'month').endOf('month');

    this.days = this.datesBetween(startDate.clone(), endDate.clone())
      .map(date => this.initDay(date));

    this.months = this.monthsBetween(startDate.clone(), endDate.clone());
  }

  private monthsBetween(startDay: Moment, endDay: Moment): Month[] {
    if (startDay.isSameOrAfter(endDay)) {
      throw new Error('startDay is not allowed to be after endDate');
    }

    const result: Month[] = [];
    let currentMonth = startDay.startOf('month');
    while (currentMonth.isSameOrBefore(endDay, 'month')) {
      result.push(this.initMonth(currentMonth));
      currentMonth = currentMonth.clone().add(1, 'month');
    }
    return result;
  }

  private datesBetween(startDay: Moment, endDay: Moment): Moment[] {
    if (startDay.isSameOrAfter(endDay)) {
      throw new Error('startDay is not allowed to be after endDate');
    }

    const result: Moment[] = [];
    let currentDate = startDay;
    while (currentDate.isSameOrBefore(endDay)) {
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
