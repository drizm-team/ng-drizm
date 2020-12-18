import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrizmLinearComponent } from './loader.component';

describe('NgLoaderComponent', () => {
  let component: DrizmLinearComponent;
  let fixture: ComponentFixture<DrizmLinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrizmLinearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrizmLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
