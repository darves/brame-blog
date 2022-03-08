import { AutoMap } from "@automapper/classes";

export class ArticleModel {
  // @AutoMap()
  id!: number;
  // @AutoMap()
  title!: string;
  // @AutoMap()
  body!: string;

  categoryId!: Number;
  userId!: number;

  createdAt!: Date;
  updatedAt!: Date;
}
