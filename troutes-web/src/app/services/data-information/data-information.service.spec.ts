import { TestBed } from '@angular/core/testing';

import { DataInformationService } from './data-information.service';

describe('DataInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataInformationService = TestBed.get(DataInformationService);
    expect(service).toBeTruthy();
  });
});
