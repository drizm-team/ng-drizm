import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearComponent } from './loader.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoaderComponent', () => {
  let component: LinearComponent;
  let fixture: ComponentFixture<LinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
