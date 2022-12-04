import { TestBed } from '@angular/core/testing';

import { GetCurrentPlaceService } from './get-current-place.service';

describe('GetCurrentPlaceService', () => {
  let service: GetCurrentPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrentPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
