import { TestBed } from '@angular/core/testing';

import { CategoriesResourceService } from './categories-resource.service';

describe('CategoriesResourceService', () => {
  let service: CategoriesResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
