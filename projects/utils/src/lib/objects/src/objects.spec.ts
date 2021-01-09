import {copy, remove} from '@drizm/utils';

describe('Objects', () => {
  let someArr: { name: string }[];
  let someObj: {
    id: number;
    user: {
      username: string;
    }
  };
  let someOtherObj: {
    username: string;
  };

  beforeEach(() => {
    someArr = [
      {name: 'hkjhjkhjk'},
      {name: 'jhjh'},
      {name: 'deleted'},
      {name: 'jkjk'},
      {name: 'jkjkl'}
    ];

    someOtherObj = {
      username: 'beastmaster64'
    };

    someObj = {
      id: 1940,
      user: someOtherObj
    };
  });

  // --- array.ts -> remove() --- //
  it('should remove an item from an array without copying the array', () => {
    const toBeDeleted = someArr[2];
    const someOtherArr = remove(someArr, toBeDeleted);
    const removedItem = someArr.find(i => i.name === 'deleted');

    expect(someOtherArr)
      .withContext('Returned value should be a reference to the original array')
      .toBe(someArr);
    expect(removedItem).toBeUndefined('The array item should be removed');
  });

  it('should remove an item from an array and return a copy of the array', () => {
    const toBeDeleted = someArr[4];
    const someOtherArr = remove(someArr, toBeDeleted, true);
    const notRemovedItem = someArr.find(i => i.name === 'jkjkl');
    const removedItem = someOtherArr.find(i => i.name === 'jkjkl');

    expect(someOtherArr)
      .withContext('Array should not equal(reference) the array it is a copy of')
      .not.toBe(someArr);
    expect(notRemovedItem)
      .toBeTruthy('Item in the original array should not be removed');
    expect(removedItem)
      .toBeUndefined('Item in the new(copied) array should be removed');
  });
  // --- --- //

  // --- generic.ts -> copy() --- //
  it('should create a deep copy of an object by default', () => {
    const copied = copy(someObj);

    expect(someObj)
      .withContext('Object should not equal(reference) the object it is a copy of')
      .not.toBe(copied);
    expect(someObj.user)
      .withContext('Object properties should not remain references')
      .not.toBe(copied.user);
  });

  it('should create a shallow copy of an object if needed', () => {
    const copied = copy(someObj, false);

    expect(someObj)
      .withContext('Object should not equal(reference) the object it is a copy of')
      .not.toBe(copied);
    expect(someObj.user)
      .withContext('Object properties should remain references')
      .toBe(copied.user);
  });

  it('should create a deep copy of an array', () => {
    const someOtherArr = [
      someObj,
      someOtherObj
    ];
    const copiedDeep = copy(someOtherArr);

    expect(copiedDeep)
      .withContext('Array should not equal(reference) the array it is a copy of')
      .not.toBe(someOtherArr);
    expect(copiedDeep[0])
      .withContext('Array items should not remain references')
      .not.toBe(someOtherArr[0]);
  });

  it('should create a shallow copy of an array', () => {
    const someOtherArr = [
      someObj,
      someOtherObj
    ];
    const copiedShallow = copy(someOtherArr, false);

    expect(copiedShallow)
      .withContext('Array should not equal(reference) the array it is a copy of')
      .not.toBe(someOtherArr);
    expect(copiedShallow[0])
      .withContext('Array items should remain references')
      .toBe(someOtherArr[0]);
  });
  // --- --- //
});
