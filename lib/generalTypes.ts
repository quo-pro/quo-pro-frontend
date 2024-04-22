export interface ILocalStorageKeys {
  storageUUID: string;
  storageUserName: string;
}

export interface IQuerySearchParam {
  page: string;
  tab?: string;
  search_value: string;
  [key: string]: any;
}
