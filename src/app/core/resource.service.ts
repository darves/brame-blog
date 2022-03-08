import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ApiResponse, BaseApiResponse, BaseApiSingleResponse, ResourceGetDTO } from './resource.api-model';
import { environment } from 'src/environments/environment';
import { EndpointPaths } from './endpoint-paths.enum';
import { RequestMethod } from './request-method.enum';
import { ApiMetaDataProviderService } from './api-meta-data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  static apiUrlPlaceholder = ':apiUrl';

  constructor(private httpClient: HttpClient, private apiMetaDataProviderService: ApiMetaDataProviderService) { }

  public getRequest<T = ResourceGetDTO>(opt: BaseRequestParams): Observable<ApiResponse<T>> {
    const params = this.resolveRequestOptions(opt, RequestMethod.Get);

    return this.httpClient.get<ApiResponse<T>>(this.resolveUrl(opt), params)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSingle<T = ResourceGetDTO>(opt: BaseRequestParams): Observable<BaseApiSingleResponse<T>> {
    const params = this.resolveRequestOptions(opt, RequestMethod.Get);

    return this.httpClient.get<BaseApiSingleResponse<T>>(this.resolveUrl(opt), params)
      .pipe(
        catchError(this.handleError)
      );
  }

  protected postRequest<T = any, R = ResourceGetDTO>(opt: RequestParams<T>): Observable<BaseApiSingleResponse<R>> {
    const params = this.resolveRequestOptions(opt, RequestMethod.Post);

    return this.httpClient
      .post<BaseApiSingleResponse<R>>(this.resolveUrl(opt), opt.reqBody, params)
      .pipe(catchError(this.handleError));
  }

  protected putRequest<T = any, R = ResourceGetDTO>(opt: RequestParams<T>): Observable<BaseApiSingleResponse<R>> {
    const params = this.resolveRequestOptions(opt, RequestMethod.Put);
    return this.httpClient
      .put<BaseApiSingleResponse<R>>(this.resolveUrl(opt), opt.reqBody, params)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('ResourceService: Something wrong happened making a request');
  }

  private resolveRequestOptions(params: BaseRequestParams, method: RequestMethod) {
    const credentials = this.apiMetaDataProviderService.pathRequeresCredentials(params.endpointPath, method);

    return {
      parans: params.httpParams,
      withCredentials: credentials,
    };
  }

  private resolveUrl(opt: BaseRequestParams) {
    let url = opt.url;

    url = url.replace(ResourceService.apiUrlPlaceholder, environment.apiUrl);

    return url;
  }
}


export interface BaseRequestParams {
  url: string;
  endpointPath: EndpointPaths;
  httpParams?: HttpParams; // was thinking I need this, but looks like no;
}

interface RequestParams<T = any> extends BaseRequestParams {
  reqBody: T;
}

/**
 * Interface used for our data-list;
 */
export interface ResourceList {
  getList(params?: any): Observable<ApiResponse<ResourceGetDTO>>
  changePage(url: string): Observable<ApiResponse<ResourceGetDTO>>
}
