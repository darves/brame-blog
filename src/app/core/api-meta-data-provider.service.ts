import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenAPIV3 } from 'openapi-types';
import { EndpointPaths } from './endpoint-paths.enum';
import { RequestMethod } from './request-method.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiMetaDataProviderService {

  private openApi!: OpenAPIV3.Document;

  constructor(private httpClient: HttpClient) {}

  init(openApi: OpenAPIV3.Document) {
    // CORS not enabled, a bit lazy to make proxy thats why we will just copy/past
    // return this.httpClient.get<OpenAPIV3.Document>(environment.openApi)
    //   .toPromise()
    //   .then((res) => {
    //     console.log(res);
    //     this.openApi = res;
    //   });

    this.openApi = openApi;
  }

  public getSchemaForPath(path: EndpointPaths): OpenAPIV3.SchemaObject | null {
    return this.getSchema(path);
  }

  public pathRequeresCredentials(_path: EndpointPaths, _method: RequestMethod): boolean {
    let result = false;
    const path = this.getPath(_path);
    const method = this.mapAppHttpMethodToOpenAPIHttpMethod(_method);
    if (path) {
      const pathMethod = path[method];
      (pathMethod?.parameters as OpenAPIV3.ParameterObject[])?.forEach((param) => {
        if (param && param.name === 'api_token' && param.required) {
          result = true;
        }
      })
    }

    return result;
  }

  private getSchema(path: EndpointPaths): OpenAPIV3.SchemaObject | null {
    const requestBody = this.getRequestBody(path);
    if (requestBody !== null) {
      return requestBody.content['application/json'].schema as OpenAPIV3.SchemaObject;
    }

    return null;
  }

  private getRequestBody(_path: EndpointPaths):  OpenAPIV3.RequestBodyObject | null {
    const path = this.getPath(_path);
    if (path && path?.post) {
      // we hardcoded .post here, fck it..
      return path.post?.requestBody as OpenAPIV3.RequestBodyObject || null;
    }

    if (path && path.put) {
      // fallback...
      return path.put?.requestBody as OpenAPIV3.RequestBodyObject || null;
    }

    return null;
  }

  private getPath(path: EndpointPaths): {
    [method in OpenAPIV3.HttpMethods]?: OpenAPIV3.OperationObject;
} | null {
    if (this.openApi.paths[path]) {
      return this.openApi.paths[path] as OpenAPIV3.PathItemObject || null;
    }

    return null;
  }

  private mapAppHttpMethodToOpenAPIHttpMethod(method: RequestMethod): OpenAPIV3.HttpMethods {
    const mapping: Record<RequestMethod, OpenAPIV3.HttpMethods> = {
      [RequestMethod.Get]: OpenAPIV3.HttpMethods.GET,
      [RequestMethod.Post]: OpenAPIV3.HttpMethods.POST,
      [RequestMethod.Put]: OpenAPIV3.HttpMethods.PUT,
      [RequestMethod.Delete]: OpenAPIV3.HttpMethods.DELETE
    }

    return mapping[method];
  }
}
