import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gauthGuard } from './gauth.guard';

describe('gauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
