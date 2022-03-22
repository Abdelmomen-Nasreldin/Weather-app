import { TestBed } from '@angular/core/testing';

import { CovertBackToFrontService } from './covert-back-to-front.service';

describe('CovertBackToFrontService', () => {
  let service: CovertBackToFrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovertBackToFrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
