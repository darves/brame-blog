import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EndpointPaths } from 'src/app/core/endpoint-paths.enum';
import { mapper } from 'src/app/core/mapper';
import { ValidationProviderService } from 'src/app/core/validation-provider.service';
import { CategoriesResourceService } from '../shared/categories-resource.service';
import { CategoryGetDTO, CategoryPostDTO, CategoryPutDTO } from '../shared/category.api-model';
import { CategoryModel } from '../shared/category.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  isNew: boolean = false;
  form: FormGroup = new FormGroup({});
  model!: CategoryModel;
  isReadOnly!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private validationProviderService: ValidationProviderService,
    private categoriesResourceService: CategoriesResourceService) {}

  ngOnInit(): void {
    this.addControls();

    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.isNew = params.id === 'new';
        if (!this.isNew) {
          this.categoriesResourceService.getSingle(params.id)
            .subscribe((res) => {
              this.form.patchValue(res.data);
              this.model = mapper.map(res.data, CategoryModel, CategoryGetDTO);
            });
        }
    });
  }

  onFormSubmit() {
    if (!this.form.valid) return;

    let dataset = this.form.getRawValue();

    if (this.isNew) {
      delete dataset.id;

      this.categoriesResourceService.post(dataset as CategoryPostDTO)
        .subscribe((resp) => {
          this.router.navigateByUrl(this.router.url.replace('new', resp.data.id + ''));
        });
    } else {
      this.categoriesResourceService.put(dataset as CategoryPutDTO)
        .subscribe((resp) => {
          this.model = mapper.map(resp.data, CategoryModel, CategoryGetDTO);
        });
    }
  }

  private addControls() {
    this.form.addControl('id', new FormControl(''));
    this.form.addControl('name', new FormControl(''));
    this.form.addControl('description', new FormControl(''));

    this.validationProviderService.addValidators(this.form, EndpointPaths.CategorySingle);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
