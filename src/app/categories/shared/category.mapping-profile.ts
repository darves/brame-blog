import { CamelCaseNamingConvention, convertUsing, mapFrom } from "@automapper/core";
import { MappingProfile } from "@automapper/core";
import { stringToDateTimeConverter } from "src/app/core/mapper";
import { CategoryGetDTO } from "./category.api-model";
import { CategoryModel } from "./category.model";


export const categoryProfile: MappingProfile = (mapper) => {
  // we dont like snake case on frontend
  mapper.createMap(CategoryGetDTO, CategoryModel)
    // this should be moved as base map;
    .forMember(
      (destination) => destination.id,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.createdAt,
      convertUsing(stringToDateTimeConverter, (source) => source.created_at)
    )
    .forMember(
      (destination) => destination.createdAt,
      convertUsing(stringToDateTimeConverter, (source) => source.updated_at)
    )
}
