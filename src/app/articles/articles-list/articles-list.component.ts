import { Component, OnInit } from '@angular/core';
import { ArticlesResourceService } from '../articles-resource.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  data: any;

  constructor(public articlesResourceService: ArticlesResourceService) { }

  ngOnInit(): void {
    this.articlesResourceService.getList()
      .subscribe((res) => {
        this.data = res.data;
      });
  }

}
