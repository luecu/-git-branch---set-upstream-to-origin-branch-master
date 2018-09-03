import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multi-range-calender-app';

  public daysSelect(dates: string[]) {
    console.log("days selected", dates);
  }
}
