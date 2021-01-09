import {backgroundFromHref, compressImage} from '@drizm/utils';

describe('Image', () => {
  let ratio: { height: number, width: number };

  beforeEach(() => {
    ratio = {
      height: 1080,
      width: 1920
    };
  });

  // --- image.ts -> backgroundFromHref() --- //
  it('should return an url() string suitable for use in css', () => {
    expect(backgroundFromHref({href: 'someImageDataUrlOrUrl'})).toEqual('url(someImageDataUrlOrUrl)');
  });
  // --- --- //

  // TODO Difficult to test image operations, the unit tests need to wait for now.
  // --- image.ts -> compressImage() --- //
  it('should throw an error if the image is not a string or a Blob', () => {
    expect(() => {
      compressImage(12349 as any, document, ratio);
    }).toThrowError('Drizm#compressImage: Could not compress. Invalid image.');
  });

  it('should throw an error if the image is not a valid data url string', async () => {
    await expectAsync(compressImage('Clearly not a valid data url', document, ratio))
      .toBeRejectedWith('Drizm#compressImage: Could not compress. Invalid image.');
  });
  // --- --- //
});
