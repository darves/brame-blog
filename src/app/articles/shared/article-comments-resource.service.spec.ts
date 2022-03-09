import { TestBed } from '@angular/core/testing';

import { ArticleCommentsResourceService } from './article-comments-resource.service';

describe('ArticleCommentsResourceService', () => {
  let service: ArticleCommentsResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleCommentsResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
