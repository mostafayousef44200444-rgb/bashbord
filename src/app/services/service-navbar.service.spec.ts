import { TestBed } from '@angular/core/testing';

import { ServiceNavbarService } from './service-navbar.service';

describe('ServiceNavbarService', () => {
  let service: ServiceNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
