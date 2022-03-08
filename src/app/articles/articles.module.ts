import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';


@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule
  ]
})
export class ArticlesModule { }
