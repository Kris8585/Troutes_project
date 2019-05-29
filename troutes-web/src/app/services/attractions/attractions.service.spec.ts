import { TestBed } from '@angular/core/testing';

import { AttractionsService } from './attractions.service';

describe('AttractionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttractionsService = TestBed.get(AttractionsService);
    expect(service).toBeTruthy();
  });
});
