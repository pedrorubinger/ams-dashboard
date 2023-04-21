import * as Yup from "yup"

export const NewPartnerFinancialSupportSchema = Yup.object().shape({
	billingMonth: Yup.string().required("Selecione o mês da competência!"),
	billingYear: Yup.number()
		.required("Informe o ano da competência!")
		.typeError("Informe um ano válido!")
		.test(
			"is-billing-year-valid",
			"Informe um ano menor ou igual ao ano atual!",
			(value: number) => {
				const currentYear = new Date().getFullYear()

				if (value > currentYear) return false
				return true
			}
		),
	category: Yup.string().required("Selecione a categoria!"),
	value: Yup.string().required("Informe o valor do lançamento!"),
	description: Yup.string()
		.optional()
		.max(80, "A descrição não pode ultrapassar 80 caracteres!"),
})
