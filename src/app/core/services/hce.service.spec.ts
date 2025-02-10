import { TestBed } from '@angular/core/testing';

import { HceService } from './hce.service';

describe('HceService', () => {
  let service: HceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
