import { ErrorCode } from "~/interfaces/ErrorCode"

export interface ServerResponse<T> {
	data?: T | undefined
	success: boolean
	error: T extends undefined ? ErrorCode : Required<ServerResponse<T>>["error"]
}
