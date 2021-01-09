import {isValidDateInstance} from '@drizm/utils';

describe('Validate', () => {
  let validDate: Date;
  let stringDate: string;
  let notADate: any;

  beforeEach(() => {
    validDate = new Date();
    stringDate = new Date().toISOString();
    notADate = 91938;
  });

  // --- date.ts -> isValidDateInstance() --- //
  it('should return true if the value is a Date instance', () => {
    expect(isValidDateInstance(validDate)).toBeTrue();
  });

  it('should return false if the value is not a Date instance', () => {
    expect(isValidDateInstance(stringDate))
      .withContext('A string Date should not pass')
      .toBeFalse();
    expect(isValidDateInstance(notADate))
      .withContext('A non-date value should not pass')
      .toBeFalse();
  });
  // --- --- //
});
