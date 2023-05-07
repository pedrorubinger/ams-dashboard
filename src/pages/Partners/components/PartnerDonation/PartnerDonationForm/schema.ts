import * as Yup from "yup"

export const NewPartnerDonationSchema = Yup.object().shape({
	billingMonth: Yup.array()
		.of(Yup.string())
		.required("Selecione o mês da competência!")
		.min(1, "Selecione pelo menos um mês da competência!"),
	billingYear: Yup.array()
		.of(
			Yup.number()
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
				)
		)
		.required("Informe ao menos um ano da competência!"),
	billingDate: Yup.array()
		.of(Yup.string())
		.required("Selecione a data da competência!")
		.min(1, "Selecione pelo menos uma data da competência!")
		.test(
			"is-billing-date-unique",
			"As datas da competência devem ser únicas!",
			(value: (string | undefined)[]) => {
				const uniqueValues = new Set(value.filter((v) => v !== undefined))
				return uniqueValues.size === value.length
			}
		),
	category: Yup.string().required("Selecione a categoria!"),
	value: Yup.string().required("Informe o valor do lançamento!"),
	description: Yup.string()
		.optional()
		.max(80, "A descrição não pode ultrapassar 80 caracteres!"),
})
