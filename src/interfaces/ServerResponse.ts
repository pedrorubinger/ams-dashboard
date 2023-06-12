import { ErrorCode } from "~/interfaces/Error"

export interface ServerResponse<T> {
	data?: T | undefined
	success: boolean
	error?: ErrorCode | undefined
}

export interface GetDataResponse {
	lastKey?: string | null | undefined
	total: number
	count: number
}

export interface GetDataParams {
	/** @default 5 */
	size?: "all" | number | null | undefined
	startAt?: string | null | undefined
}

export interface Pagination {
	lastKey?: string | null | undefined
	total?: number | undefined
}
