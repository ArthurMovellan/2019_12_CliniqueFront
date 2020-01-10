import { TestBed } from '@angular/core/testing';

import { EtatService } from './etat.service';

describe('EtatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtatService = TestBed.get(EtatService);
    expect(service).toBeTruthy();
  });
});
