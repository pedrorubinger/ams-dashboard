import { ServerErrorResponse } from "~/interfaces/ServerErrorResponse"

export interface ServerResponse<T> {
	data?: T | undefined
	success: boolean
	error: T extends undefined
		? any | ServerErrorResponse
		: Required<ServerResponse<T>>["error"]
}
