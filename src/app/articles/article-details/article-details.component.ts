import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { CategoriesResourceService } from 'src/app/categories/shared/categories-resource.service';
import { CategoryGetDTO } from 'src/app/categories/shared/category.api-model';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { EndpointPaths } from 'src/app/core/endpoint-paths.enum';
import { mapper } from 'src/app/core/mapper';
import { ValidationProviderService } from 'src/app/core/validation-provider.service';
import { ArticleCommentsResourceService } from '../article-comments-resource.service';
import { ArticlesResourceService } from '../shared/articles-resource.service';
import { ArticleGetDTO, ArticlePostDTO, ArticlePutDTO } from '../shared/article.api-model';
import { ArticleModel } from '../shared/article.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  isNew: boolean = false;
  form: FormGroup = new FormGroup({});
  model!: ArticleModel;
  categories!: DropdownItem<CategoryGetDTO>[];
  isReadOnly!: boolean;

  constructor(
    private router: Router,
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

    this.route.params
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(params => {
      this.isNew = params.id === 'new';
      if (!this.isNew) {
        this.articleResourceService.getSingle(params.id)
          .subscribe((res) => {
            this.form.patchValue(res.data);
            this.model = mapper.map(res.data, ArticleModel, ArticleGetDTO);
          });
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
    if (!this.form.valid) return;

    let dataset = this.form.getRawValue();

    if (this.isNew) {
      delete dataset.id;

      this.articleResourceService.post(dataset as ArticlePostDTO)
        .subscribe((resp) => {
          this.router.navigateByUrl(this.router.url.replace('new', resp.data.id + ''));
        });
    } else {
      this.articleResourceService.put(dataset as ArticlePutDTO)
        .subscribe((resp) => {
          this.model = mapper.map(resp.data, ArticleModel, ArticleGetDTO);
        });
    }
  }

  /**
   * we can also introduce mapping here to completely separate frontend from API DTOs
   * but since no time I'll just go easy way;
   */
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
