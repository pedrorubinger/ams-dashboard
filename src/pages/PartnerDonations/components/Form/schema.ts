import * as Yup from "yup"

export const SearchPartnerDonationSchema = Yup.object().shape({
	date: Yup.string().typeError("Selecione o intervalo de datas!"),
})
