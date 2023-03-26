import { ErrorCode } from "~/interfaces"

export const LOGIN_BAD_REQUEST_ERRORS = [
	ErrorCode["400_INVALID_CREDENTIALS"],
	ErrorCode["400_EMAIL_MUST_BE_TEXT"],
	ErrorCode["400_EMAIL_IS_INVALID"],
	ErrorCode["400_EMAIL_IS_REQUIRED"],
	ErrorCode["400_PASSWORD_MUST_BE_TEXT"],
	ErrorCode["400_PASSWORD_IS_REQUIRED"],
	ErrorCode["400_PASSWORD_IS_INVALID"],
]
