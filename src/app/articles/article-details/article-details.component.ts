import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { CategoriesResourceService } from 'src/app/categories/shared/categories-resource.service';
import { CategoryGetDTO } from 'src/app/categories/shared/category.api-model';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { EndpointPaths } from 'src/app/core/endpoint-paths.enum';
import { ValidationProviderService } from 'src/app/core/validation-provider.service';
import { ArticleCommentsResourceService } from '../article-comments-resource.service';
import { ArticlesResourceService } from '../articles-resource.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  form: FormGroup = new FormGroup({});
  id!: number;
  categories!: DropdownItem<CategoryGetDTO>[];
  isReadOnly!: boolean;

  constructor(
    private route: ActivatedRoute,
    private articleResourceService: ArticlesResourceService,
    private validationProviderService: ValidationProviderService,
    public articleCommentsResourceService: ArticleCommentsResourceService,
    private categoriesResourceService: CategoriesResourceService,
    private appUserService: AppUserService) {}

  ngOnInit(): void {
    this.addControls();
    this.categoriesResourceService
      .getAsDropdownItems()
      .subscribe((categories: DropdownItem<CategoryGetDTO>[]) => {
        this.categories = categories;
      });

    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        alert('add new');
      } else {
        this.articleResourceService.getSingle(params.id)
          .subscribe((res) => {
            console.log(res);
            this.form.patchValue(res.data);
            this.id = res.data.id;
          });

        // alert(params.id);
      }
   });

   this.appUserService
    .isLoggedin
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((isLoggedIn) => {
      this.isReadOnly = !isLoggedIn;

      if (this.isReadOnly) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  onFormSubmit() {
    alert('submited');
  }

  private addControls() {
    this.form.addControl('id', new FormControl(''));
    this.form.addControl('body', new FormControl(''));
    this.form.addControl('title', new FormControl(''));
    this.form.addControl('category_id', new FormControl(''));

    this.validationProviderService.addValidators(this.form, EndpointPaths.ArticlesSingle);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
