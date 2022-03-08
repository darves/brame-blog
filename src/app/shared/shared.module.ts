import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from './data-list/data-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EnterTokenComponent } from './enter-token/enter-token.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

const components = [DataListComponent]

@NgModule({
  declarations: [
    ...components,
    PaginationComponent,
    EnterTokenComponent
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class SharedModule { }
