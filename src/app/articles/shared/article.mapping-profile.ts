import { CamelCaseNamingConvention, convertUsing, mapFrom } from "@automapper/core";
import { MappingProfile } from "@automapper/core";
import { stringToDateTimeConverter } from "src/app/core/mapper";
import { ArticleGetDTO } from "./article.api-model";
import { ArticleModel } from "./article.model";


export const articleProfile: MappingProfile = (mapper) => {
  // we dont like snake case on frontend
  mapper.createMap(ArticleGetDTO, ArticleModel)
    .forMember(
      (destination) => destination.id,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.userId,
      mapFrom((source) => source.user_id)
    )
    .forMember(
      (destination) => destination.categoryId,
      mapFrom((source) => source.category_id)
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
