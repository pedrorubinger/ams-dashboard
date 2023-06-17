import * as Yup from "yup"

export const NewDonationSchema = Yup.object().shape({
	billingDate: Yup.array()
		.of(Yup.string())
		.required("Selecione o mês da competência!")
		.min(1, "Selecione pelo menos um mês da competência!"),
	incomeDate: Yup.string().required("Informe a data em que o valor foi pago!"),
	category: Yup.string().required("Selecione a categoria!"),
	value: Yup.string().required("Informe o valor do lançamento!"),
	description: Yup.string()
		.optional()
		.max(80, "A descrição não pode ultrapassar 80 caracteres!"),
})
