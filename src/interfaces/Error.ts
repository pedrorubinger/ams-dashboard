import { AxiosError } from "axios"

export enum ErrorCode {
	"DEFAULT" = "Desculpe, algo deu errado. Tente novamente mais tarde ou entre em contato.",
	/** 500 */
	"500_INTERNAL_SERVER_ERROR" = "Desculpe, ocorreu um erro interno. Tente novamente mais tarde ou entre em contato.",
	/** 401 */
	"401_MISSING_TOKEN" = "Você não está autorizado(a) a acessar este recurso.",
	"401_INVALID_TOKEN" = "Você não está autorizado(a) a acessar este recurso.",
	"401_TOKEN_HAS_EXPIRED" = "Parece que a sua sessão expirou. Faça login novamente para continuar.",
	"401_NOT_AUTHORIZED" = "Você não está autorizado(a) a acessar este recurso.",
	"401_TENANT_IS_NOT_ACTIVE" = "Autorização negada. Por favor, entre em contato.",
	"401_USER_IS_NOT_ACTIVE" = "Autorização negada. Por favor, entre em contato.",
	/** 404 */
	"404_USER_NOT_FOUND" = "Não encontramos este usuário.",
	"404_TENANT_NOT_FOUND" = "Não encontramos esta instituição.",
	"404_REGISTRATION_ID_NOT_FOUND" = "Não encontramos o último registro de matrícula do associado.",
	"400_PARTNER_NOT_FOUND" = "Não encontramos este associado.",
	"400_DONATION_NOT_FOUND" = "Não encontramos esta contribuição.",
	/** 400 */
	"400_EMAIL_ALREADY_REGISTERED" = "Este email já está sendo utilizado.",
	"400_INVALID_CREDENTIALS" = "Usuário ou senha incorretos.",
	"400_NAME_MUST_BE_TEXT" = "O nome deve ser um texto.",
	"400_NAME_EXCEEDS_LENGTH_80" = "O nome não pode exceder 80 caracteres!",
	"400_NAME_IS_REQUIRED" = "Informe o nome.",
	"400_RESPONSIBLE_IS_REQUIRED" = "Informe o nome do responsável.",
	"400_RESPONSIBLE_MUST_BE_TEXT" = "O nome do responsável possui um formato inválido.",
	"400_RESPONSIBLE_EXCEEDS_LENGTH_100" = "O nome do responsável não pode exceder 100 caracteres.",
	"400_NAME_EXCEEDS_LENGTH_100" = "O nome não pode exceder 100 caracteres.",
	"400_EMAIL_MUST_BE_TEXT" = "O email possui um formato inválido.",
	"400_EMAIL_IS_INVALID" = "O email informado é inválido.",
	"400_EMAIL_IS_REQUIRED" = "Informe o email.",
	"400_PASSWORD_MUST_BE_TEXT" = "A senha possui um formato inválido.",
	"400_PASSWORD_IS_REQUIRED" = "Informe a senha.",
	"400_PASSWORD_IS_INVALID" = "A senha é inválida.",
	"400_NEW_PASSWORD_MUST_BE_TEXT" = "A nova senha possui um formato inválido.",
	"400_NEW_PASSWORD_IS_INVALID" = "A nova senha é inválida.",
	"400_NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_PASSWORD" = "A nova senha deve ser diferente da senha atual.",
	"400_PHONE_MUST_BE_TEXT" = "O telefone possui um formato inválido.",
	"400_PHONE_EXCEEDS_LENGTH_40" = "O telefone não pode exceder 40 caracteres.",
	"400_ROLE_IS_REQUIRED" = "Informe a função/cargo do usuário.",
	"400_ROLE_MUST_BE_TEXT" = "A função/cargo do usuário possui um formato inválido.",
	"400_ROLE_IS_INVALID" = "A função/cargo é inválida.",
	"400_TENANT_MUST_BE_TEXT" = "Informe uma instituição válida.",
	"400_TENANT_IS_REQUIRED" = "Informe uma instituição.",
	"400_REGISTRATION_ID_MUST_BE_TEXT" = "A matrícula possui um formato inválido.",
	"400_REGISTRATION_ID_IS_REQUIRED" = "Informe a matrícula.",
	"400_REGISTRATION_ID_MUST_BE_NUMERIC" = "A matrícula deve ser um número válido.",
	"400_CONTENT_MUST_BE_TEXT" = "O conteúdo da pesquisa deve ser um texto.",
	"400_CONTENT_EXCEEDS_LENGTH_100" = "O conteúdo da pesquisa não pode exceder 100 caracteres.",
	"400_CONTENT_IS_REQUIRED" = "Informe o conteúdo.",
	"400_FIELD_MUST_BE_TEXT" = "O campo possui um formato inválido.",
	"400_FIELD_IS_REQUIRED" = "Informe o campo.",
	"400_FIELD_IS_NOT_ALLOWED" = "Informe um campo válido.",
	"400_ID_MUST_BE_TEXT" = "O ID possui um formato inválido.",
	"400_ID_IS_REQUIRED" = "Informe o ID.",
	"400_BILLING_DATE_MUST_BE_AN_ARRAY" = "A(s) data(s) de referência estão no formato incorreto.",
	"400_BILLING_DATE_REQUIRES_AT_LEAST_ONE_ELEMENT" = "Você deve informar pelo menos uma data de referência.",
	"400_BILLING_DATE_MUST_BE_TEXT" = "A(s) data(s) devem ser do tipo texto.",
	"400_BILLING_DATE_IS_REQUIRED" = "Você deve informar pelo menos uma data de referência.",
	"400_DONATION_CATEGORY_MUST_BE_TEXT" = "A categoria possui um formato inválido.",
	"400_DONATION_CATEGORY_IS_REQUIRED" = "Você deve informar uma categoria.",
	"400_DONATION_CATEGORY_IS_NOT_ALLOWED" = "A categoria informada não é válida.",
	"400_PARTNER_ID_MUST_BE_TEXT" = "O identificador do associado possui um formato inválido.",
	"400_PARTNER_ID_IS_REQUIRED" = "Selecione um associado.",
	"400_DONATION_VALUE_MUST_BE_NUMBER" = "O valor da contribuição deve ser numérico.",
	"400_DONATION_VALUE_IS_REQUIRED" = "Informe o valor da contribuição.",
	"400_DONATION_DESCRIPTION_MUST_BE_TEXT" = "A descrição da contribuição possui um formato inválido.",
	"400_AUTO_REGISTRATION_MUST_BE_BOOLEAN" = "Informe corretamente se deseja gerar uma matrícula automaticamente.",
	"400_DONATION_INCOME_DATE_MUST_BE_DATE" = "A data de pagamento deve ser estar no formato correto de data!",
	"400_DONATION_INCOME_DATE_IS_REQUIRED" = "Informe a data de pagamento da contribuição.",
	"400_REGISTRATION_ID_IS_ALREADY_REGISTERED" = "Este número de matrícula já está cadastrado.",
}

export interface ServerErrorResponse {
	code?: ErrorCode
	error: {
		_original: object
		details: [
			{
				message: ErrorCode
				path: string[]
				type: string
				context: {
					invalids: [
						{
							adjust: null
							in: boolean
							iterables: null
							map: null
							separator: string
							type: string
							ancestor: number
							path: string
							depth: number
							key: string
							root: string
							display: string
						}
					]
					label: string
					value: string
					key: string
				}
			}
		]
	}
}

export type RawError = AxiosError<ServerErrorResponse> | unknown

export interface BadRequestErrorCode<T> {
	code: ErrorCode
	field: keyof T
}
