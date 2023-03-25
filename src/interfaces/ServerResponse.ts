/** TO DO: Set error type correctly */
export interface ServerResponse<T> {
	data?: T | undefined
	success: boolean
	error: T extends undefined ? any : Required<ServerResponse<T>>["error"]
}
