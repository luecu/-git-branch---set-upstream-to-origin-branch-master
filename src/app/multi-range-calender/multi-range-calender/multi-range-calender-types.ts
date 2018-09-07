import {Moment} from 'moment';


export class Day {
  public label = this.date.date();

  constructor(
    public date: Moment,
    public selected: boolean,
    /*If a user markes a range (but does not click yet), this range is gonna be shown as preview selected
     * true      = preview as selected
     * false     = preview as unselected
     * undefined = no preview */
    public previewSelected: boolean = false ) {
  }
}

export class Month {
  constructor(public title: string, public days: Day[]) {
  }

  public firstDay(): Day {
    return this.days
      .reduce((first: Day, current: Day) =>
        first.date.isBefore(current.date) ? first : current);

  }
}

export interface DayEvent {
  day: Day;
  event: MouseEvent;
}
