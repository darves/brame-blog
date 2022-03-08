export class ResourceGetDTO {
  id!: number;
  created_at!: string;
  updated_at!: string;
}

export class BaseApiResponse<T = ResourceGetDTO> {
  data!: T[];
}

export class BaseApiSingleResponse<T = ResourceGetDTO> {
  data!: T;
}

export class ApiResponse<T> extends BaseApiResponse<T> {
  current_page!: number;
  first_page_url!: string;
  from!: number;
  last_page!: number;
  last_page_url!: string;
  next_page_url!: string | null;
  path!: string;
  per_page!: number;
  prev_page_url!: string | null;
  to!: number;
  total!: number;
  links!: ResourceInfo[];
}

class ResourceInfo {
  url!: string | null;
  label!: string;
  active!: boolean;
}

