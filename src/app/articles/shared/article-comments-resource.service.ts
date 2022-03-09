import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointPaths } from '../core/endpoint-paths.enum';
import { ApiResponse } from '../core/resource.api-model';
import { ResourceList, ResourceService } from '../core/resource.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleCommentsResourceService implements ResourceList {

  constructor(private resourceService: ResourceService) { }

  getList(articleId: string): Observable<ApiResponse<any>> {
    let url = `${ResourceService.apiUrlPlaceholder}${EndpointPaths.ArticlesComments}`
    url = url.replace('{article_id}', articleId + '');

    return this.resourceService.getRequest<any>({
      url: url,
      endpointPath: EndpointPaths.ArticlesComments
    });
  }

  changePage(url: string): Observable<ApiResponse<any>> {
    throw new Error('Method not implemented.');
  }
}
