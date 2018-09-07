import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRangeCalenderComponent } from './multi-range-calender.component';

describe('MultiRangeCalenderComponent', () => {
  let component: MultiRangeCalenderComponent;
  let fixture: ComponentFixture<MultiRangeCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRangeCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRangeCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
