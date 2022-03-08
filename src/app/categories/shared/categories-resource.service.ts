import { Injectable } from '@angular/core';
import { forkJoin, merge, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { EndpointPaths } from 'src/app/core/endpoint-paths.enum';
import { ApiResponse } from 'src/app/core/resource.api-model';
import { ResourceList, ResourceService } from 'src/app/core/resource.service';
import { CategoryGetDTO, CategoryPostDTO, CategoryPutDTO } from './category.api-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResourceService implements ResourceList{
  private readonly endpointSingle = EndpointPaths.CategorySingle;

  constructor(private resourceService: ResourceService) { }

  getList(params?: any): Observable<ApiResponse<CategoryGetDTO>> {
    return this.resourceService.getRequest<CategoryGetDTO>({
      url: `${ResourceService.apiUrlPlaceholder}${EndpointPaths.Categories}`,
      endpointPath: EndpointPaths.Categories
    });
  }

  getSingle(id: string) {
    let url = `${ResourceService.apiUrlPlaceholder}${this.endpointSingle}`
    url = url.replace('{category_id}', id);

    return this.resourceService.getSingle<CategoryGetDTO>({
      url: url,
      endpointPath: this.endpointSingle
    });
  }

  post(data: CategoryPostDTO) {
    let url = `${ResourceService.apiUrlPlaceholder}${this.endpointSingle}`
    url = url.replace('/{category_id}', '');

    return this.resourceService.postRequest({
      url: url,
      endpointPath: this.endpointSingle,
      reqBody: data,
    });
  }

  put(data: CategoryPutDTO) {
    let url = `${ResourceService.apiUrlPlaceholder}${this.endpointSingle}`
    url = url.replace('{category_id}', `${data.id}`);

    return this.resourceService.putRequest({
      url: url,
      endpointPath: this.endpointSingle,
      reqBody: data,
    });
  }

  changePage(url: string): Observable<ApiResponse<any>> {
    return this.resourceService.getRequest<CategoryGetDTO>({
      url: url,
      endpointPath: EndpointPaths.Categories
    });
}

  // I think I make it a bit overcomplicated;
  // anyway, since I'm not sure what to pass to api to fetch all categories,
  // I was making one request to get the first page and then I was iterating through the pages and make multiple (N) requests;
  // After that do some mapping and return a observable;
  getAsDropdownItems(params?: any): Observable<DropdownItem<CategoryGetDTO>[]> {
    return new Observable<DropdownItem<CategoryGetDTO>[]>(subscriber => {
      this.getAsDropdownItemsInternal(params)
        .subscribe((res) => {
          res.subscribe((res) => {
            subscriber.next(res);
            subscriber.complete();
          });
        });
    });
  }

  private getAsDropdownItemsInternal(params?: any): Observable<Observable<DropdownItem<CategoryGetDTO>[]>> {
    return this.getList(params)
    .pipe(
      take(1),
      map((firstPage) => {
        let requests = [];
        firstPage.links.forEach((link) => {
          // isNaN(+link.label) a bit hacky but we want to ignore previous and next;
          if (link.url && !link.active && isNaN(+link.label)) {
            requests.push(this.changePage(link.url as string));
          }
        });

        requests.unshift(of(firstPage));

        return forkJoin(requests)
      })
    )
    .pipe(
      take(1),
      map((res) => {
        return res.pipe(
          map((resp) => {
            let result: DropdownItem<CategoryGetDTO>[] = [];
            resp.forEach((response) => {
              result.push.apply(result,  response.data.map((category) => {
                return {
                  label: category.name,
                  value: category.id,
                  entity: category
                }
              }));
            });

            return result;
          })
        )
      })
    );
  }


}
