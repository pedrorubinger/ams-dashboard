import { ErrorCode } from "~/interfaces/ErrorCode"

export interface ServerResponse<T> {
	data?: T | undefined
	success: boolean
	error?: ErrorCode | undefined
}
