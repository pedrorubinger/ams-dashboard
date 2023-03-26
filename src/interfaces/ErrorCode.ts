enum ErrorCode {
	"DEFAULT" = "Desculpe, algo deu errado. Tente novamente mais tarde ou entre em contato.",
	/** 500 */
	"500_INTERNAL_SERVER_ERROR" = "Desculpe, ocorreu um erro interno. Tente novamente mais tarde ou entre em contato.",
	/** 401 */
	"401_MISSING_TOKEN" = "Você não está autorizado(a) a acessar este recurso.",
	"401_INVALID_TOKEN" = "Você não está autorizado(a) a acessar este recurso.",
	"401_TOKEN_HAS_EXPIRED" = "Parece que a sua sessão expirou. Faça login novamente para continuar.",
	"401_NOT_AUTHORIZED" = "Você não está autorizado(a) a acessar este recurso.",
	/** 404 */
	"404_USER_NOT_FOUND" = "Não encontramos este usuário.",
	/** 400 */
	"400_EMAIL_ALREADY_REGISTERED" = "Este email já está sendo utilizado.",
	"400_INVALID_CREDENTIALS" = "Usuário ou senha incorretos.",
	"400_NAME_MUST_BE_TEXT" = "O seu nome deve ser um texto.",
	"400_NAME_EXCEEDS_LENGTH_80" = "O nome não pode exceder 80 caracteres!",
	"400_NAME_IS_REQUIRED" = "Informe o nome.",
	"400_RESPONSIBLE_IS_REQUIRED" = "Informe o nome do responsável.",
	"400_RESPONSIBLE_MUST_BE_TEXT" = "O nome do responsável deve ser do tipo texto.",
	"400_RESPONSIBLE_EXCEEDS_LENGTH_100" = "O nome do responsável não pode exceder 100 caracteres.",
	"400_NAME_EXCEEDS_LENGTH_100" = "O nome não pode exceder 100 caracteres.",
	"400_EMAIL_MUST_BE_TEXT" = "O email deve ser do tipo texto.",
	"400_EMAIL_IS_INVALID" = "O email informado é inválido.",
	"400_EMAIL_IS_REQUIRED" = "Informe o email.",
	"400_PASSWORD_MUST_BE_TEXT" = "A senha deve ser do tipo texto.",
	"400_PASSWORD_IS_REQUIRED" = "Informe a senha.",
	"400_PASSWORD_IS_INVALID" = "A senha é inválida.",
	"400_NEW_PASSWORD_MUST_BE_TEXT" = "A nova senha deve ser do tipo texto.",
	"400_NEW_PASSWORD_IS_INVALID" = "A nova senha é inválida.",
	"400_NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_PASSWORD" = "A nova senha deve ser diferente da senha atual.",
	"400_PHONE_MUST_BE_TEXT" = "O telefone deve ser do tipo texto.",
	"400_PHONE_EXCEEDS_LENGTH_40" = "O telefone não pode exceder 40 caracteres.",
	"400_ROLE_IS_REQUIRED" = "Informe a função/cargo do usuário.",
	"400_ROLE_MUST_BE_TEXT" = "A função/cargo do usuário deve ser do tipo texto.",
	"400_ROLE_IS_INVALID" = "A função/cargo é inválida.",
}

export { ErrorCode }
