import { AutoMap } from "@automapper/classes";

export class ArticleModel {
  id!: number;
  @AutoMap()
  title!: string;
  @AutoMap()
  body!: string;

  categoryId!: Number;
  userId!: number;

  createdAt!: Date;
  updatedAt!: Date;
}
