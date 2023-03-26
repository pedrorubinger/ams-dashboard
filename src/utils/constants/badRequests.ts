import { BadRequestErrorCode, ErrorCode, LoginFormValues } from "~/interfaces"

type Fields = LoginFormValues & { all: string }

export const LOGIN_BAD_REQUEST_ERRORS: BadRequestErrorCode<Fields>[] = [
	{ code: ErrorCode["400_INVALID_CREDENTIALS"], field: "all" },
	{ code: ErrorCode["400_EMAIL_MUST_BE_TEXT"], field: "email" },
	{ code: ErrorCode["400_EMAIL_IS_INVALID"], field: "email" },
	{ code: ErrorCode["400_EMAIL_IS_REQUIRED"], field: "email" },
	{ code: ErrorCode["400_PASSWORD_MUST_BE_TEXT"], field: "password" },
	{ code: ErrorCode["400_PASSWORD_IS_REQUIRED"], field: "password" },
	{ code: ErrorCode["400_PASSWORD_IS_INVALID"], field: "password" },
]
