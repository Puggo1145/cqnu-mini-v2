export interface MyResponse<T> {
    code: string
    success: boolean
    message?: string
    data: T
}

type PageResponseBody<T> = {
    records: T[]
    total: number
    size: number
    current: number
    pages: number
}
export type PageResponse<T> = MyResponse<PageResponseBody<T>>