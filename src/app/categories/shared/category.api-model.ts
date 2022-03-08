import { ResourceGetDTO } from "src/app/core/resource.api-model";

export class CategoryGetDTO extends ResourceGetDTO {
  name!: string;
  description!: string;
}

export type CategoryPutDTO = Omit<CategoryGetDTO, 'created_at' | 'updated_at'>;

export type CategoryPostDTO = Omit<CategoryGetDTO, 'id' | 'created_at' | 'updated_at'>;
