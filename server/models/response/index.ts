export interface APIPageResponse<T> {
    count: number,
    next:string | null | undefined,
    previous: string | null | undefined, 
    results: T[]
}

