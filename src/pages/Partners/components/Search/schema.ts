import * as Yup from "yup"

export const SearchPartnersSchema = Yup.object().shape({
	field: Yup.string().required("Selecione um filtro!"),
	content: Yup.string().required("Digite a informação que deseja pesquisar!"),
})
