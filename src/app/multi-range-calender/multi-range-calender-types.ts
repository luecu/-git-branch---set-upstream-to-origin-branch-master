import { Moment } from "moment";


export class Day {
    public label = this.date.date();

    constructor(
        public date: Moment,
        public selected: boolean) {}
}

export class Month {
    constructor(public title: string, public days: Day[]) {}

    public firstDay(): Day {
        return this.days
            .reduce((first: Day, current: Day) => 
                first.date.isBefore(current.date) ? first: current);

    }
}

export interface DayClickEvent {
    day: Day,
    event: MouseEvent
}