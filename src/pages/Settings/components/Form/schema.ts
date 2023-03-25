import * as Yup from "yup"

import { AccountFormValues as FormValues } from "~/interfaces"

export const AccountSchema = Yup.object<FormValues>().shape({
	changePassword: Yup.boolean(),
	password: Yup.string().required("Insira sua senha atual!"),
	newPassword: Yup.string().when("changePassword", {
		is: true,
		then: () => Yup.string().required("Insira sua nova senha!"),
		otherwise: () => Yup.string(),
	}),
})
