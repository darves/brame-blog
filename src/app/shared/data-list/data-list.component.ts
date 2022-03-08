import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ApiResponse, ResourceGetDTO } from 'src/app/core/resource.api-model';
import { ResourceList } from 'src/app/core/resource.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  @ContentChild("itemTemplate")
  itemTemplate!: TemplateRef<any>;

  @Input()
  api!: ResourceList;

  response!: ApiResponse<ResourceGetDTO>;

  constructor() { }

  ngOnInit(): void {
    if (!this.api) {
      throw 'ResourceList not passed'
    }

    this.api.getList()
      .subscribe((resp) => {
        this.response = resp;
      });
  }

  onPageChange(url: string) {
    this.api.changePage(url)
    .subscribe((resp) => {
      this.response = resp;
    });
  }
}
