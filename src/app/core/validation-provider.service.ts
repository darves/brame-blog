import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { OpenAPIV3 } from "openapi-types";
import { ApiMetaDataProviderService } from './api-meta-data-provider.service';

import { EndpointPaths } from './endpoint-paths.enum';

@Injectable({
  providedIn: 'root'
})
export class ValidationProviderService {

  openApi!: OpenAPIV3.Document;

  constructor(private apiMetaDataProviderService: ApiMetaDataProviderService) {}

  addValidators(form: FormGroup, path: EndpointPaths) {
    const schema = this.apiMetaDataProviderService.getSchemaForPath(path);

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
}
