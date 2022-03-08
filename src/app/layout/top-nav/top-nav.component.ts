import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { EnterTokenComponent } from 'src/app/shared/enter-token/enter-token.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  public isLoggedIn: boolean = false;

  constructor(private appUserService: AppUserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.appUserService
      .isLoggedin
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  onLoginClick() {
    this.dialog.open(EnterTokenComponent);
  }

  onLogoutClick() {
    this.appUserService.setToken('');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
