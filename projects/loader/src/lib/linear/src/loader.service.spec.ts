import { TestBed } from '@angular/core/testing';

import { NgLoaderService } from './loader.service';

describe('NgLoaderService', () => {
  let service: NgLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
