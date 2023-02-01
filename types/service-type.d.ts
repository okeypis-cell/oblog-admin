export * from '../services/baseClass'

declare global {
  export interface BaseQuery {
    page: number
    limit: number
  }

  export interface BaseResponseArray<T> extends BaseResponseData {
    data: {
      count: number
      rows: T[]
    }
  }
  export interface BaseResponseData<T> extends BaseResponse {
    data: T
  }
  export type BaseResponse = {
    message: string
    status: number
  }
}
