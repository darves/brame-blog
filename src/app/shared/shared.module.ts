import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from './data-list/data-list.component';
import { PaginationComponent } from './pagination/pagination.component';

const components = [DataListComponent]

@NgModule({
  declarations: [
    ...components,
    PaginationComponent
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
