import {toBase64} from '@drizm/utils';

describe('Encode', () => {
  let someArr: { name: string }[];
  let someSymbol: symbol;
  let someObj: {
    key: number;
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
      key: 1940,
      user: someOtherObj
    };

    someSymbol = Symbol('some symbol description');
  });

  // --- base64.ts -> toBase64() --- //
  it('should return an encoded string if provided a symbol value', () => {
    expect(toBase64(someSymbol)).toBeTruthy();
  });

  it('should throw an error if provided a function', () => {
    expect(() => {
      toBase64(() => null);
    }).toThrowError('Drizm#toBase64: Data type not supported for encoding');
  });
  // --- --- //
});
