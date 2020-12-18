import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DrizmLoaderService} from './loader.service';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {LOADING_OPTIONS} from './loader-options';
import {LoaderConfig} from './loader.models';


// noinspection CssUnresolvedCustomProperty
@Component({
  selector: 'drizm-loader-linear',
  template: `
    <mwc-linear-progress class="drizm-loader_linear" #linearProgressEl *ngIf="loading$ | async" indeterminate>
    </mwc-linear-progress>`,
  styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99999;
    }

    .drizm-loader_linear {
      --dzm-primary: pink;
      --dzm-buffer: skyblue;
      --mdc-theme-primary: var(--dzm-primary);
      --mdc-linear-progress-buffer-color: var(--dzm-buffer);
    }`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrizmLinearComponent implements OnInit, OnDestroy {
  private routerSub!: Subscription;

  constructor(private loading: DrizmLoaderService,
              private router: Router,
              @Inject(LOADING_OPTIONS) private config: LoaderConfig) {
  }

  ngOnInit(): void {
    if (this.config.navigationLoader) {
      this.routerSub = this.router.events
        .pipe(filter(e => {
          return e instanceof NavigationStart ||
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError;
        }))
        .subscribe(event => {
          if (event instanceof NavigationStart) {
            this.loading.add();
          } else {
            this.loading.subtract();
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.config.navigationLoader) {
      this.routerSub.unsubscribe();
    }
  }

  get loading$(): Observable<boolean> {
    return this.loading.listen$;
  }
}
