import { TestBed } from '@angular/core/testing';

import { ShceduleService } from './shcedule.service';

describe('ShceduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShceduleService = TestBed.get(ShceduleService);
    expect(service).toBeTruthy();
  });
});
