import { ResourceGetDTO } from "src/app/core/resource.api-model";

export class CategoryGetDTO extends ResourceGetDTO {
  name!: string;
  description!: string;
}
