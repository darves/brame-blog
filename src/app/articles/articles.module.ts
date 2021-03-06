import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { mapper } from '../core/mapper';
import { articleProfile } from './shared/article.mapping-profile';


@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule {

  constructor() {
    mapper.addProfile(articleProfile);
  }
}
