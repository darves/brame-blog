import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiResponse } from 'src/app/core/resource.api-model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output()
  pageChange = new EventEmitter<string>();

  private _apiResponse!: ApiResponse<any>;
  @Input()
  set apiResponse(apiResponse: ApiResponse<any>) {
    this._apiResponse = apiResponse;
    this.pages = [];

    if (apiResponse) {
      apiResponse.links.forEach((item) => {
        this.pages.push({
          isDisabled: item.active || item.url === null,
          label: item.label,
          link: item.url as string
        });
      });
    }
  }

  get apiResponse() {
    return this._apiResponse;
  }

  pages: Page[] = [];

  constructor() {

  }

  onPageClick(page: Page) {
    this.pageChange.emit(page.link);
  }

  ngOnInit(): void {
  }
}

interface Page {
  label: string;
  link: string;
  isDisabled: boolean;
}
