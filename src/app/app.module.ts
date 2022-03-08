import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { AuthInterceptor } from './core/auth.interceptor';
import { ApiMetaDataProviderService } from './core/api-meta-data-provider.service';

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
    deps: [ApiMetaDataProviderService],
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initServicesFactory(
  validationProviderService: ApiMetaDataProviderService,
) {
  return async () => {
    const openApi = await import('../app/openApi.copy-past.json') as any;

    return validationProviderService.init(openApi);
  };
}
