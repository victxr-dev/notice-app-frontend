import { TestBed } from '@angular/core/testing';

import { NavbarHomeService } from './navbar-home.service';

describe('NavbarHomeService', () => {
  let service: NavbarHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
