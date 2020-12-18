import {InjectionToken} from '@angular/core';
import {LoaderConfig} from './loader.models';


export const DEFAULT_OPTIONS = {
  navigationLoader: true,
  xhrLoader: true,
  wait: 150,
};

export const LOADING_OPTIONS = new InjectionToken<LoaderConfig>('loadingOptions', {
  factory: (): LoaderConfig => DEFAULT_OPTIONS
});
