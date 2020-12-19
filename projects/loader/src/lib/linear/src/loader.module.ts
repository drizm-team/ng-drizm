import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinearComponent} from './loader.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingInterceptor} from './loader.interceptor';
import {LOADING_OPTIONS, DEFAULT_OPTIONS} from './loader-options';
import {LoaderConfig} from './loader.models';


@NgModule({
  declarations: [
    LinearComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  exports: [
    LinearComponent
  ]
})
export class LoaderModule {
  static forRoot(config?: LoaderConfig): ModuleWithProviders<LoaderModule> {
    return {
      ngModule: LoaderModule,
      providers: [{
        provide: LOADING_OPTIONS,
        useValue: {
          ...DEFAULT_OPTIONS,
          ...config
        }
      }]
    };
  }
}
