import * as Yup from "yup"

export const NewDonationSchema = Yup.object().shape({
	billingDate: Yup.array()
		.of(Yup.string())
		.required("Selecione o mês da competência!")
		.min(1, "Selecione pelo menos um mês da competência!")
		.test(
			"is-unique",
			"Os meses da competência devem ser únicos!",
			function (value) {
				const uniqueValues = new Set(value) // Convert array to Set to remove duplicates

				return uniqueValues.size === value.length // Compare the length of the Set with the original array
			}
		),
	incomeDate: Yup.string()
		.nullable()
		.test(
			"is-future-date",
			"A data deve ser igual ou anterior a hoje!",
			function (value) {
				if (!value) return true /* Allow undefined values */

				const incomeDate = new Date(value)
				const today = new Date()

				return incomeDate <= today
			}
		)
		.required("Informe a data em que o valor foi pago!"),
	category: Yup.string().required("Selecione a categoria!"),
	value: Yup.string().required("Informe o valor do lançamento!"),
	description: Yup.string()
		.optional()
		.max(80, "A descrição não pode ultrapassar 80 caracteres!"),
})
