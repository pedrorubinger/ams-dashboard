import * as Yup from "yup"

export const TenantsDrawerSchema = Yup.object().shape({
	isActive: Yup.boolean(),
	name: Yup.string()
		.required("Insira o nome da instituição!")
		.max(80, "O nome não pode ser maior que 80 caracteres!"),
	responsible: Yup.string()
		.required("Insira o nome do responsável!")
		.max(100, "O nome não pode ser maior que 80 caracteres!"),
})
