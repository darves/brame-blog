import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUserService } from '../app-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private appUserService: AppUserService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.withCredentials) {
      // some endpoints are protected, some not;
      let cloned = request.clone({
        params: request.params.set('api_token', this.appUserService.token || ''),
        headers: request.headers,
        // a workaround
        withCredentials: false
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
