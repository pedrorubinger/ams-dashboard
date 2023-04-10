import * as Yup from "yup"

export const SearchPartnersSchema = Yup.object().shape({
	type: Yup.string().required("Selecione um tipo!"),
	value: Yup.string().required("Digite a informação que deseja pesquisar."),
})
