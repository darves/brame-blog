import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';

const routes: Routes = [
  {path: '', component: ArticlesListComponent}
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
