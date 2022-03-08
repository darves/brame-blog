import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EndpointPaths } from 'src/app/core/endpoint-paths.enum';
import { ValidationProviderService } from 'src/app/core/validation-provider.service';
import { CategoriesResourceService } from '../shared/categories-resource.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  form: FormGroup = new FormGroup({});
  id!: number;
  isReadOnly!: boolean;

  constructor(
    private route: ActivatedRoute,
    private validationProviderService: ValidationProviderService,
    private categoriesResourceService: CategoriesResourceService) {}

  ngOnInit(): void {
    this.addControls();

    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        if (params.id === 'new') {
          alert('add new');
        } else {
          this.categoriesResourceService.getSingle(params.id)
            .subscribe((res) => {
              this.form.patchValue(res.data);
              this.id = res.data.id;
            });
        }
    });
  }

  onFormSubmit() {
    alert('submited');
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
