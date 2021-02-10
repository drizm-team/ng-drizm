import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Type, EmptyString} from '../types';


@Component({
  selector: 'dzm-button',
  template: `
    <button #btnEl [disabled]="disabled">
      <span *ngIf="content">{{content}}</span>
      <ng-content *ngIf="!content"></ng-content>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements AfterViewInit {
  /**
   * @description Button content. Alternatively, you can insert content straight into the component:
   * @example
   * <dzm-button>
   *   <span>Confirm</span>
   * </dzm-button>
   */
  @Input() content?: string;

  /**
   * @description Whether the button should be disabled.
   */
  @Input() disabled = false;

  @ViewChild('btnEl') private btnEl!: ElementRef;

  constructor(
    private renderer: Renderer2,
    /** @description type - Button type */
    @Attribute('type') public type?: Type,
    /** @description primary - Button style. Write <dzm-button primary></dzm-button> to enable it */
    @Attribute('primary') public primary?: EmptyString,
    /** @description secondary - Button style. Write <dzm-button secondary></dzm-button> to enable it */
    @Attribute('secondary') public secondary?: EmptyString,
    /** @description danger - Button style. Write <dzm-button danger></dzm-button> to enable it */
    @Attribute('danger') public danger?: EmptyString,
    /** @description outline - Button design. Write <dzm-button outline></dzm-button> to enable it */
    @Attribute('outline') public outline?: EmptyString
  ) {
  }

  ngAfterViewInit(): void {
    this.addStyle();
    this.addDesign();
  }

  private addStyle(): void {
    let btnStyle = '';

    if (this.primary === '') {
      btnStyle = 'dbtn-primary';
    } else if (this.secondary === '') {
      btnStyle = 'dbtn-secondary';
    } else if (this.danger === '') {
      btnStyle = 'dbtn-danger';
    } else {
      console.warn('No style has been added to the button dzm-button');
      return;
    }

    this.renderer.addClass(this.btnEl.nativeElement, btnStyle);
  }

  private addDesign(): void {
    let btnDesign = '';

    if (this.outline === '') {
      btnDesign = 'dbtn-outline';
    } else {
      return;
    }

    this.renderer.addClass(this.btnEl.nativeElement, btnDesign);
  }
}
