import { MultiRangeCalenderModule } from './multi-range-calender.module';

describe('MultiRangeCalenderModule', () => {
  let multiRangeCalenderModule: MultiRangeCalenderModule;

  beforeEach(() => {
    multiRangeCalenderModule = new MultiRangeCalenderModule();
  });

  it('should create an instance', () => {
    expect(multiRangeCalenderModule).toBeTruthy();
  });
});
