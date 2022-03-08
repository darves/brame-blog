export interface BaseDropdownItem {
  label: string;
  value: string | number | any;
}

export interface DropdownItem<T> extends BaseDropdownItem {
  entity: T;
}
