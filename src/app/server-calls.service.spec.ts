import { TestBed, inject } from '@angular/core/testing';

import { ServerCallsService } from './server-calls.service';

describe('ServerCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerCallsService]
    });
  });

  it('should be created', inject([ServerCallsService], (service: ServerCallsService) => {
    expect(service).toBeTruthy();
  }));
});
