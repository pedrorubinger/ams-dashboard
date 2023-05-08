import * as Yup from "yup"

export const PartnerSchema = Yup.object().shape({
	id: Yup.string().required("Informe a matrícula do associado!"),
	name: Yup.string()
		.required("Informe o nome do associado!")
		.max(80, "O nome não pode ser maior que 80 caracteres!"),
})
