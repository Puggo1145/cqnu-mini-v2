export interface MyResponse<T> {
    code: string
    success: boolean
    message?: string
    data: T
}