import { TestBed } from '@angular/core/testing';

import { ParametersSettingService } from './parameters-setting.service';

describe('ParametersSettingService', () => {
  let service: ParametersSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametersSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
