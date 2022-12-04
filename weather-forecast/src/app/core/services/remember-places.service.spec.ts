import { TestBed } from '@angular/core/testing';

import { RememberPlacesService } from './remember-places.service';

describe('RememberPlacesService', () => {
  let service: RememberPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RememberPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
