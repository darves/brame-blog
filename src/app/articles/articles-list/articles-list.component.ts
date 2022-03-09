import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { ArticlesResourceService } from '../shared/articles-resource.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  public isReadOnly: boolean = true;

  constructor(public articlesResourceService: ArticlesResourceService, private appUserService: AppUserService) {

  }

  ngOnInit(): void {
    this.appUserService
      .isLoggedin
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isLoggedIn) => this.isReadOnly = !isLoggedIn);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
