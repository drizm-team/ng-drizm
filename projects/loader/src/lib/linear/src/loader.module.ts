import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrizmLinearComponent} from './loader.component';
import '@material/mwc-linear-progress';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingInterceptor} from './loader.interceptor';
import {LOADING_OPTIONS, DEFAULT_OPTIONS} from './loader-options';
import {LoaderConfig} from './loader.models';


@NgModule({
  declarations: [
    DrizmLinearComponent
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
    DrizmLinearComponent
  ],
  schemas: [
    // Added so Angular doesn't throw errors for mwc-linear-progress which is not an Angular component
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DrizmLoaderModule {
  static forRoot(config?: LoaderConfig): ModuleWithProviders<DrizmLoaderModule> {
    return {
      ngModule: DrizmLoaderModule,
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
