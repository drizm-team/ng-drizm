import {HREF, IObject} from '@drizm/utils/src/lib/types';

export function backgroundFromHref(href: HREF): string {
  if (!href) {
    console.warn('Drizm#backgroundFromHref: Could not create url. The href value is ' + href);
    return '';
  }
  return `url(${href.href})`;
}

type TRenderer = IObject<any> & {
  createElement<T extends 'canvas' | 'img'>(tagName: T): T extends 'canvas' ? HTMLCanvasElement : HTMLImageElement;
};

type TImage<T> = T extends string ? string : Blob;

// Type assertions in Promise resolve values are needed because TypeScript does not currently have a more elegant
// solution to correctly guarding types with conditional return types
export function compressImage<T extends string | Blob>(
  image: T,
  renderer: TRenderer,
  ratio: { width: number, height: number },
  type?: string,
  quality?: number): Promise<TImage<T>> {
  const canvas: HTMLCanvasElement = renderer.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageEl: HTMLImageElement = renderer.createElement('img');
  const reader = new FileReader();

  canvas.width = ratio.width;
  canvas.height = ratio.height;

  if (image instanceof Blob) {
    if (!type) {
      type = image.type;
    }
    reader.readAsDataURL(image);
    return new Promise<TImage<T>>((resolve, reject) => {
      reader.onload = () => {
        imageEl.src = reader.result as string;
        imageEl.onload = () => {
          context.drawImage(imageEl, 0, 0, imageEl.width, imageEl.height, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) {
              return reject('Drizm#compressImage: Could not compress. Invalid image.');
            }
            return resolve(blob as TImage<T>);
          }, type, quality || .75);
        };
        imageEl.onerror = () => reject('Drizm#compressImage: Could not compress. Invalid image.');
      };
    });
  }

  if (typeof image === 'string') {
    imageEl.src = image;
    return new Promise<TImage<T>>((resolve, reject) => {
      imageEl.onload = () => {
        context.drawImage(imageEl, 0, 0, imageEl.width, imageEl.height, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL(type || 'image/webp', quality || .75);
        return resolve(compressed as TImage<T>);
      };
      imageEl.onerror = () => reject('Drizm#compressImage: Could not compress. Invalid image.');
    });
  }

  throw new Error('Drizm#compressImage: Could not compress. Invalid image.');
}
