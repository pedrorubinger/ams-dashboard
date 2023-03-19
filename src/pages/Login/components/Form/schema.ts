import * as Yup from "yup"

export const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Email inválido!").required("Insira seu email!"),
	password: Yup.string().required("Insira sua senha!"),
})
