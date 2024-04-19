import { TestBed } from '@angular/core/testing';

import { RentAgreementsService } from './rent-agreements.service';

describe('RentAgreementsService', () => {
  let service: RentAgreementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentAgreementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
