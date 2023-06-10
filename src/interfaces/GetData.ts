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
