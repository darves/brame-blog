import { ResourceGetDTO } from "src/app/core/resource.api-model";

export class ArticleGetDTO extends ResourceGetDTO {
  title!: string;
  body!: string;
  category_id!: Number;
  user_id!: number;
}

export type ArticlePostDTO = Omit<ArticleGetDTO, 'id' | 'created_at' | 'updated_at'>;

export type ArticlePutDTO = Omit<ArticleGetDTO, 'created_at' | 'updated_at'>;
