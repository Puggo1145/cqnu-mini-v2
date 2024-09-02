export interface MyResponse<T> {
    code: string
    success: boolean
    message?: string
    data: T
}

export type PageResponse<T> = {
    records: T[]
    total: number
    size: number
    current: number
    pages: number
}

export type EasyNotePageResponse<T> = {
    noteRespIPage: PageResponse<T>
    totalCount: number
}
