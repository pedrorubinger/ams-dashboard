import * as Yup from "yup"

export const NewPartnerDonationSchema = Yup.object().shape({
	billingDate: Yup.array()
		.of(Yup.string())
		.required("Selecione o mês da competência!")
		.min(1, "Selecione pelo menos um mês da competência!"),
	// billingDate: Yup.array()
	// 	.of(Yup.string())
	// 	.required("Selecione a data da competência!")
	// 	.min(1, "Selecione pelo menos uma data da competência!")
	// 	.test(
	// 		"is-billing-date-unique",
	// 		"As datas da competência devem ser únicas!",
	// 		(value: (string | undefined)[]) => {
	// 			const uniqueValues = new Set(value.filter((v) => v !== undefined))
	// 			return uniqueValues.size === value.length
	// 		}
	// 	),
	category: Yup.string().required("Selecione a categoria!"),
	value: Yup.string().required("Informe o valor do lançamento!"),
	description: Yup.string()
		.optional()
		.max(80, "A descrição não pode ultrapassar 80 caracteres!"),
})
