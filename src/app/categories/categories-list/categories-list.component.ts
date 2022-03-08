import { Component, OnInit } from '@angular/core';
import { CategoriesResourceService } from '../shared/categories-resource.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  constructor(public categoriesResourceService: CategoriesResourceService) { }

  ngOnInit(): void {
  }

}
