import { TestBed } from '@angular/core/testing';

import { ServiceMomo } from './service-momo';

describe('ServiceMomo', () => {
  let service: ServiceMomo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMomo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
