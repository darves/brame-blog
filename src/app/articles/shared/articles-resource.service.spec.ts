import { TestBed } from '@angular/core/testing';

import { ArticlesResourceService } from './articles-resource.service';

describe('ArticlesResourceService', () => {
  let service: ArticlesResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
