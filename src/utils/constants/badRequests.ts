import {
	BadRequestErrorCode,
	ErrorCode,
	LoginFormValues,
	AccountFormValues,
	TenantFormValues,
	UserFormValues,
	PartnerFinancialSupportValues,
} from "~/interfaces"

type LoginFields = LoginFormValues & { all: string }
type AccountFields = Omit<AccountFormValues, "changePassword">
type UserFields = Omit<UserFormValues, "isCreating">
type TenantFields = TenantFormValues
type PartnerFinancialSupportFields = PartnerFinancialSupportValues

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

export const TENANT_BAD_REQUEST_ERRORS: BadRequestErrorCode<TenantFields>[] = [
	{ code: ErrorCode["400_NAME_MUST_BE_TEXT"], field: "name" },
	{ code: ErrorCode["400_NAME_EXCEEDS_LENGTH_80"], field: "name" },
	{ code: ErrorCode["400_NAME_IS_REQUIRED"], field: "name" },
	{ code: ErrorCode["400_RESPONSIBLE_IS_REQUIRED"], field: "responsible" },
	{ code: ErrorCode["400_RESPONSIBLE_MUST_BE_TEXT"], field: "responsible" },
	{
		code: ErrorCode["400_RESPONSIBLE_EXCEEDS_LENGTH_100"],
		field: "responsible",
	},
]

export const USER_BAD_REQUEST_ERRORS: BadRequestErrorCode<UserFields>[] = [
	{ code: ErrorCode["400_NAME_MUST_BE_TEXT"], field: "name" },
	{ code: ErrorCode["400_NAME_EXCEEDS_LENGTH_100"], field: "name" },
	{ code: ErrorCode["400_NAME_IS_REQUIRED"], field: "name" },
	{ code: ErrorCode["400_EMAIL_MUST_BE_TEXT"], field: "email" },
	{ code: ErrorCode["400_EMAIL_IS_INVALID"], field: "email" },
	{ code: ErrorCode["400_EMAIL_IS_REQUIRED"], field: "email" },
	{ code: ErrorCode["400_PASSWORD_MUST_BE_TEXT"], field: "password" },
	{ code: ErrorCode["400_PASSWORD_IS_REQUIRED"], field: "password" },
	{ code: ErrorCode["400_PASSWORD_IS_INVALID"], field: "password" },
	// { code: ErrorCode["400_PHONE_MUST_BE_TEXT"], field: "phone" },
	// { code: ErrorCode["400_PHONE_EXCEEDS_LENGTH_40"], field: "phone" },
	// { code: ErrorCode["400_ROLE_IS_REQUIRED"], field: "role" },
	// { code: ErrorCode["400_ROLE_MUST_BE_TEXT"], field: "" },
	// { code: ErrorCode["400_ROLE_IS_INVALID"], field: "" },
]

/** TO DO: Add list of errors for the entity... */
export const PARTNER_FINANCIAL_SUPPORT_BAD_REQUEST_ERRORS: BadRequestErrorCode<PartnerFinancialSupportFields>[] =
	[]
