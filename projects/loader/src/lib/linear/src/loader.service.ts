import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LOADING_OPTIONS} from './loader-options';
import {LoaderConfig} from './loader.models';


@Injectable({
  providedIn: 'root'
})
export class DrizmLoaderService {
  private readonly isLoading$ = new BehaviorSubject<boolean>(false);
  private loadingCount = 0;

  constructor(@Inject(LOADING_OPTIONS) private config: LoaderConfig) {
  }

  add(): void {
    if (!this.loadingCount) {
      setTimeout(() => {
        if (this.loadingCount) {
          this.isLoading$.next(true);
        }
      }, this.config.wait);
    }
    this.loadingCount++;
  }

  subtract(): void {
    if (this.loadingCount) {
      this.loadingCount--;
      if (!this.loadingCount) {
        this.isLoading$.next(false);
      }
    }
  }

  get listen$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
