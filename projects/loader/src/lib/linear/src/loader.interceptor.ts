import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DrizmLoaderService} from './loader.service';
import {finalize} from 'rxjs/operators';
import {LOADING_OPTIONS} from './loader-options';
import {LoaderConfig} from './loader.models';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loading: DrizmLoaderService,
              @Inject(LOADING_OPTIONS) private config: LoaderConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.config.xhrLoader) {
      this.loading.add();
      return next.handle(request).pipe(
        finalize(() => this.loading.subtract())
      );
    }
    return next.handle(request);
  }
}
