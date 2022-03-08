import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointPaths } from '../core/endpoint-paths.enum';
import { ApiResponse } from '../core/resource.api-model';
import { ResourceList, ResourceService } from '../core/resource.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesResourceService implements ResourceList {

  constructor(private resourceService: ResourceService) { }

  // I would prefer here doing page change differently but api works on this way so...
  changePage(url: string): Observable<ApiResponse<any>> {
    return this.resourceService.getRequest<any>({
      url: url
    });
  }

  getList(): Observable<ApiResponse<any>> {
    return this.resourceService.getRequest<any>({
      url: `${ResourceService.apiUrlPlaceholder}${EndpointPaths.Articles}`
    })
  }
}
