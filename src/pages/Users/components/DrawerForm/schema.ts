import * as Yup from "yup"

export const UsersDrawerSchema = Yup.object().shape({
	isCreating: Yup.boolean(),
	tenantId: Yup.string().required("Selecione uma instituição!"),
	name: Yup.string()
		.required("Insira o nome do usuário!")
		.max(80, "O nome não pode ser maior que 80 caracteres!"),
	email: Yup.string().when("isCreating", {
		is: true,
		then: () =>
			Yup.string()
				.email("Email inválido!")
				.required("Insira o email do usuário"),
		otherwise: () => Yup.string(),
	}),
	password: Yup.string().when("isCreating", {
		is: true,
		then: () => Yup.string().required("Insira a senha do usuário"),
		otherwise: () => Yup.string(),
	}),
})
