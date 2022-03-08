import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { mapper } from '../core/mapper';
import { categoryProfile } from './shared/category.mapping-profile';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule {
  constructor() {
    mapper.addProfile(categoryProfile);
  }
 }
