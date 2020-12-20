import { AxiosResponse } from 'axios'

export function resolveResponseData<T = any>(res: AxiosResponse<T>) {
    return res.data
}

export function resolveResponseText(res: any): string {
    return res.text()
}
