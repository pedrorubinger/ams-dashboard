import {
	BadRequestErrorCode,
	ErrorCode,
	LoginFormValues,
	AccountFormValues,
} from "~/interfaces"

type LoginFields = LoginFormValues & { all: string }
type AccountFields = Omit<AccountFormValues, "changePassword">

export const LOGIN_BAD_REQUEST_ERRORS: BadRequestErrorCode<LoginFields>[] = [
	{ code: ErrorCode["400_INVALID_CREDENTIALS"], field: "all" },
	{ code: ErrorCode["400_EMAIL_MUST_BE_TEXT"], field: "email" },
	{ code: ErrorCode["400_EMAIL_IS_INVALID"], field: "email" },
	{ code: ErrorCode["400_EMAIL_IS_REQUIRED"], field: "email" },
	{ code: ErrorCode["400_PASSWORD_MUST_BE_TEXT"], field: "password" },
	{ code: ErrorCode["400_PASSWORD_IS_REQUIRED"], field: "password" },
	{ code: ErrorCode["400_PASSWORD_IS_INVALID"], field: "password" },
]

export const UPDATE_ACCOUNT_BAD_REQUEST_ERRORS: BadRequestErrorCode<AccountFields>[] =
	[
		{
			code: ErrorCode["400_EMAIL_ALREADY_REGISTERED"],
			field: "email",
		},
		{ code: ErrorCode["400_NAME_MUST_BE_TEXT"], field: "name" },
		{ code: ErrorCode["400_NAME_EXCEEDS_LENGTH_80"], field: "name" },
		{ code: ErrorCode["400_NAME_IS_REQUIRED"], field: "name" },
		{ code: ErrorCode["400_NAME_EXCEEDS_LENGTH_100"], field: "name" },
		{ code: ErrorCode["400_EMAIL_MUST_BE_TEXT"], field: "email" },
		{ code: ErrorCode["400_EMAIL_IS_INVALID"], field: "email" },
		{ code: ErrorCode["400_EMAIL_IS_REQUIRED"], field: "email" },
		{ code: ErrorCode["400_PASSWORD_MUST_BE_TEXT"], field: "password" },
		{ code: ErrorCode["400_PASSWORD_IS_REQUIRED"], field: "password" },
		{ code: ErrorCode["400_PASSWORD_IS_INVALID"], field: "password" },
		{
			code: ErrorCode["400_NEW_PASSWORD_MUST_BE_TEXT"],
			field: "newPassword",
		},
		{ code: ErrorCode["400_NEW_PASSWORD_IS_INVALID"], field: "newPassword" },
		{
			code: ErrorCode["400_NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_PASSWORD"],
			field: "newPassword",
		},
		{ code: ErrorCode["400_PHONE_MUST_BE_TEXT"], field: "phone" },
		{ code: ErrorCode["400_PHONE_EXCEEDS_LENGTH_40"], field: "phone" },
	]
