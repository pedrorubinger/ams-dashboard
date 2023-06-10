import { ErrorCode } from "~/interfaces/Error"

export interface ServerResponse<T> {
	data?: T | undefined
	success: boolean
	error?: ErrorCode | undefined
}
