export type ApiPaginationOptions = {
  page: number
  take: number
  order: string
}

export type PaginatedListMeta = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  itemCount: number
  page: number
  pageCount: number
  take: number
}

export enum ListOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type QueryParams = {
  whereOptions: Record<string, any>
  paginationOptions: ApiPaginationOptions
  enabled: boolean
}
