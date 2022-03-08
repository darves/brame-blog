import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationProviderService {

  openApi!: OpenAPIV3.Document;

  constructor(private httpClient: HttpClient) {}

  init(openApi: OpenAPIV3.Document) {
    // CORS not enabled, a bit lazy to make proxy thats why we will just copy/past
    // return this.httpClient.get<OpenAPIV3.Document>(environment.openApi)
    //   .toPromise()
    //   .then((res) => {
    //     console.log(res);
    //     this.openApi = res;
    //   });

    // openApi.paths['/articles'].post.requestBody.content['application/json'].schema
    (openApi.paths['/articles']?.post?.requestBody as OpenAPIV3.RequestBodyObject).content['application/json'].schema

    this.openApi = openApi;
  }
}
