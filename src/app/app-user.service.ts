import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private _token = new BehaviorSubject<string | null>(null);
  public setToken(token: string) {
    this._token.next(token);
  }

  public readonly isLoggedin: Observable<boolean> = this._token.asObservable()
    .pipe(
      map((val) => !!val)
    );

  constructor() { }
}
