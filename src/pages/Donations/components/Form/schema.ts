import * as Yup from "yup"

export const SearchDonationSchema = Yup.object().shape({
	date: Yup.string().typeError("Selecione o intervalo de datas!"),
})
