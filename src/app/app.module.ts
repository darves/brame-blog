import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationProviderService } from './core/validation-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { OpenAPIV3 } from "openapi-types";
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initServicesFactory,
    deps: [ValidationProviderService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initServicesFactory(
  validationProviderService: ValidationProviderService,
) {
  return async () => {
    const openApi = await import('../app/openApi.copy-past.json') as any;

    return validationProviderService.init(openApi);
  };
}
