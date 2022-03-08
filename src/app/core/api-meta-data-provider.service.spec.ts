import { TestBed } from '@angular/core/testing';

import { ApiMetaDataProviderService } from './api-meta-data-provider.service';

describe('ApiMetaDataProviderService', () => {
  let service: ApiMetaDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMetaDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
