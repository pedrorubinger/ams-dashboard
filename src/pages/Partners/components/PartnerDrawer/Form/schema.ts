import * as Yup from "yup"

export const PartnerSchema = Yup.object().shape({
	id: Yup.string().when("autoRegistrationId", {
		is: false,
		then: () => Yup.string().required("Informe a matrícula do associado!"),
		otherwise: () => Yup.string(),
	}),
	name: Yup.string()
		.required("Informe o nome do associado!")
		.max(80, "O nome não pode ser maior que 80 caracteres!"),
	autoRegistrationId: Yup.boolean(),
})
