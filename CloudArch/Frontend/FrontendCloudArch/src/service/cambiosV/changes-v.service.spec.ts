import { TestBed } from '@angular/core/testing';

import { ChangesVService } from './changes-v.service';

describe('ChangesVService', () => {
  let service: ChangesVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangesVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
