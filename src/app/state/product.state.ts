export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export enum ProductActionsTypes{
  GET_ALL_PRODUCTS = "[Product] Get All products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available products",
  SEARCH_PRODUCTS = "[Product] Search products",
  NEW_PRODUCTS = "[Product] New products",
  EDIT = "[Product] Edit product",
  DELETE = "[Product] Delete product",
  SELECT = "[Product] Select product",
}

export interface ActionsEvent {
  type: ProductActionsTypes,
  payload?: any
}

export interface AppDataState<T> {
  dataState: DataStateEnum,
  data?: T,
  errorMessage?: string
}
