import { TestBed } from '@angular/core/testing';

import { PassOnEncapsulationService } from './pass-on-encapsulation.service';

describe('PassOnEncapsulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassOnEncapsulationService = TestBed.get(PassOnEncapsulationService);
    expect(service).toBeTruthy();
  });
});
