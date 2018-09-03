export interface Day {
    date: string,
    selected: boolean
}

export class Month {
    constructor(public days: Day[]) {}
}