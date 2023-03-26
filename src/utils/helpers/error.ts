import { AxiosError } from "axios"

import { ErrorCode, RawError, ServerErrorResponse } from "~/interfaces"

export const handleError = (err: RawError): ErrorCode => {
	const code: ErrorCode | undefined =
		(err as AxiosError<ServerErrorResponse>)?.response?.data?.code ||
		(err as AxiosError<ServerErrorResponse>)?.response?.data?.error
			?.details?.[0]?.message

	if (code && code in ErrorCode)
		return (
			ErrorCode[code as unknown as keyof typeof ErrorCode] ?? ErrorCode.DEFAULT
		)

	return ErrorCode.DEFAULT
}
