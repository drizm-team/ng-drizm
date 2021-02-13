import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {remove} from '@drizm/utils';

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.removeArrayItem();
  }

  removeArrayItem(): void {
    const arr: number[] = [this.randomInt(), this.randomInt(), this.randomInt(), this.randomInt(), this.randomInt()];
    console.log(remove(arr, [1, 2, 3], true));
  }

  randomInt(): number {
    return Math.floor(Math.random() * 100);
  }
}
