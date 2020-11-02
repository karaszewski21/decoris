import { TestBed } from '@angular/core/testing';

import { ParametersClientService } from './parameters-client.service';

describe('ParametersClientService', () => {
  let service: ParametersClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametersClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
