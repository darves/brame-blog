
/**
 * this is not required and needed but just to make our validation provider readability better
 * I come up with this as fastest solution.
 */
export enum EndpointPaths {
  Articles = '/articles',
  ArticlesSingle = '/articles/{article_id}',
  ArticlesComments = '/articles/{article_id}/comments',
  Categories = '/categories',
  CategorySingle = '/categories/{category_id}'
}
