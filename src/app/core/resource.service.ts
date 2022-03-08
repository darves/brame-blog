import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ApiResponse, BaseApiResponse, BaseApiSingleResponse, ResourceGetDTO } from './resource.api-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  static apiUrlPlaceholder = ':apiUrl';

  constructor(private httpClient: HttpClient) { }

  public getRequest<T = ResourceGetDTO>(opt: BaseRequestParams): Observable<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(this.resolveUrl(opt))
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSingle<T = ResourceGetDTO>(opt: BaseRequestParams): Observable<BaseApiSingleResponse<T>> {
    return this.httpClient.get<BaseApiSingleResponse<T>>(this.resolveUrl(opt))
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('ResourceService: Something wrong happened making a request');
  }

  private resolveUrl(opt: BaseRequestParams) {
    let url = opt.url;

    url = url.replace(ResourceService.apiUrlPlaceholder, environment.apiUrl);

    return url;
  }
}


export interface BaseRequestParams {
  url: string;
  httpParams?: HttpParams; // was thinking I need this, but looks like no;
}

/**
 * Interface used for our data-list;
 */
export interface ResourceList {
  getList(params?: any): Observable<ApiResponse<ResourceGetDTO>>
  changePage(url: string): Observable<ApiResponse<ResourceGetDTO>>
}
