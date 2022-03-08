import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EndpointPaths } from './endpoint-paths.enum';

@Injectable({
  providedIn: 'root'
})
export class ValidationProviderService {

  openApi!: OpenAPIV3.Document;

  constructor(private httpClient: HttpClient) {}

  addValidators(form: FormGroup, path: EndpointPaths) {
    const schema = this.getSchema(path);

    if (schema) {
      schema.required?.forEach((requiredField) => {
        form.get(requiredField)?.addValidators(Validators.required);
      });

      Object.keys(schema.properties || {}).forEach((propName: string) => {
        if (schema.properties && schema.properties[propName]) {
          let schemaObject  = (schema.properties[propName] as OpenAPIV3.BaseSchemaObject)
          form.get(propName)?.addValidators(Validators.maxLength(schemaObject.maximum || 0));
        }
      })
    }
  }

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

  private getSchema(path: EndpointPaths): OpenAPIV3.SchemaObject | null {
    const requestBody = this.getRequestBody(path);
    if (requestBody !== null) {
      return requestBody.content['application/json'].schema as OpenAPIV3.SchemaObject;
    }

    return null;
  }

  private getRequestBody(path: EndpointPaths):  OpenAPIV3.RequestBodyObject | null {
    if (this.openApi.paths[path] && this.openApi.paths[path]?.post) {
      // we hardcoded .post here, fck it..
      return this.openApi.paths[path]?.post?.requestBody as OpenAPIV3.RequestBodyObject || null;
    }

    if (this.openApi.paths[path] && this.openApi.paths[path]?.put) {
      // fallback...
      return this.openApi.paths[path]?.put?.requestBody as OpenAPIV3.RequestBodyObject || null;
    }

    return null;
  }
}
