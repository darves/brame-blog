import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointPaths } from '../../core/endpoint-paths.enum';
import { ApiResponse, ResourceGetDTO } from '../../core/resource.api-model';
import { ResourceList, ResourceService } from '../../core/resource.service';
import { ArticleGetDTO, ArticlePostDTO, ArticlePutDTO } from './article.api-model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesResourceService implements ResourceList {

  private readonly endpoint = EndpointPaths.Articles;
  private readonly endpointSingle = EndpointPaths.ArticlesSingle;

  constructor(private resourceService: ResourceService) { }

  // I would prefer here doing page change differently but api works on this way so...
  changePage(url: string): Observable<ApiResponse<ArticleGetDTO>> {
    return this.resourceService.getRequest<ArticleGetDTO>({
      url: url,
      endpointPath: this.endpoint
    });
  }

  getList(): Observable<ApiResponse<any>> {
    return this.resourceService.getRequest<ArticleGetDTO>({
      url: `${ResourceService.apiUrlPlaceholder}${this.endpoint}`,
      endpointPath: this.endpoint
    });
  }

  getSingle(id: string) {
    let url = `${ResourceService.apiUrlPlaceholder}${this.endpointSingle}`
    url = url.replace('{article_id}', id);

    return this.resourceService.getSingle<ArticleGetDTO>({
      url: url,
      endpointPath: this.endpointSingle
    });
  }

  post(data: ArticlePostDTO) {
    let url = `${ResourceService.apiUrlPlaceholder}${this.endpointSingle}`
    url = url.replace('/{article_id}', '');

    return this.resourceService.postRequest({
      url: url,
      endpointPath: this.endpointSingle,
      reqBody: data,
      enableWorkaroundForApiTextResponseTypeYesIMakeThis2Long: true
    });
  }

  put(data: ArticlePutDTO) {
    let url = `${ResourceService.apiUrlPlaceholder}${this.endpointSingle}`
    url = url.replace('{article_id}', `${data.id}`);

    return this.resourceService.putRequest({
      url: url,
      endpointPath: this.endpointSingle,
      reqBody: data,
    });
  }
}
