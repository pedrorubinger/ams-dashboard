import * as Yup from "yup"

export const NewPartnerFinancialSupportSchema = Yup.object().shape({
	billingMonth: Yup.string().required("Selecione o mês da competência!"),
	category: Yup.string().required("Selecione a categoria!"),
	value: Yup.string().required("Informe o valor do lançamento!"),
	description: Yup.string()
		.optional()
		.max(80, "A descrição não pode ultrapassar 80 caracteres!"),
})
