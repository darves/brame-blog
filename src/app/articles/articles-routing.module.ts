import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

const routes: Routes = [
  {path: '', component: ArticlesListComponent},
  // we are just protecting new one;
  {path: 'articles/new', component: ArticleDetailsComponent, canActivate: [AuthGuard]},
  {path: 'articles/:id', component: ArticleDetailsComponent},
];
// const routes: Routes = [
//   { path: '', redirectTo: 'products', pathMatch: 'full' },
//   { path: 'products', component: ProductListComponent },
//   { path: 'products/:id', component: ProductDetailsComponent },
//   { path: 'create', component: ProductCreateComponent }
// ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
