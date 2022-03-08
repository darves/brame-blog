import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { CategoriesResourceService } from '../shared/categories-resource.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  public isReadOnly: boolean = true;

  constructor(public categoriesResourceService: CategoriesResourceService, private appUserService: AppUserService) { }

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
