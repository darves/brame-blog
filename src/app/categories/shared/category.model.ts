import { AutoMap } from "@automapper/classes";

export class CategoryModel {
  id!: number;
  @AutoMap()
  name!: string;
  @AutoMap()
  description!: string;

  createdAt!: Date;
  updatedAt!: Date;
}
