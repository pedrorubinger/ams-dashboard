import { ErrorCode } from "~/interfaces/ErrorCode"

export interface BadRequestErrorCode<T> {
	code: ErrorCode
	field: keyof T
}
