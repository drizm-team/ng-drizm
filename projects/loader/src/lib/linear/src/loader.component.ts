import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './loader.service';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {LOADING_OPTIONS} from './loader-options';
import {LoaderConfig} from './loader.models';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'drizm-loader-linear',
  templateUrl: `./loader.component.html`,
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('indeterminate', [
      state('start', style({
        left: '100%'
      })),
      state('end', style({
        left: '100%'
      })),
      transition('* => *', [
        animate('900ms cubic-bezier(0, .4, .3, 0)', keyframes([
          style({
            left: '-15%',
            width: '15%'
          }),
          style({
            left: 0,
            width: '15%'
          }),
          style({
            left: '50%',
            width: '25%'
          }),
          style({
            left: '85%',
            width: '15%'
          }),
          style({
            left: '92.5%',
            width: '15%'
          }),
          style({
            left: '100%',
            width: '15%'
          })
        ]))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinearComponent implements OnInit, OnDestroy {
 // TODO implement determinate loader
  /**
   * Whether the loader should be indeterminate
   * @example
   * <drizm-loader-linear indeterminate></drizm-loader-linear>
   */
    // @Input() indeterminate?: '';
  private indeterminate = '';

  /** Internal property */
  state?: 'start' | 'end' = 'start';
  /** Internal property */
  private routerSub!: Subscription;

  constructor(private loading: LoaderService,
              private router: Router,
              @Inject(LOADING_OPTIONS) private config: LoaderConfig) {
  }

  ngOnInit(): void {
    if (this.indeterminate === '') {
      this.state = 'start';
    }

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

  onDone(): void {
    if (this.indeterminate === '') {
      this.state = this.state === 'start'
        ? 'end'
        : 'start';
    }
  }

  get loading$(): Observable<boolean> {
    return this.loading.listen$;
  }
}
