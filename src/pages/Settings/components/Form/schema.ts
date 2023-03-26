import * as Yup from "yup"

import { AccountFormValues as FormValues } from "~/interfaces"

export const AccountSchema = Yup.object<FormValues>().shape({
	changePassword: Yup.boolean(),
	password: Yup.string().required("Insira sua senha atual!"),
	newPassword: Yup.string().when("changePassword", {
		is: true,
		then: () =>
			Yup.string()
				.min(6, "A nova senha deve ter pelo menos 6 caracteres!")
				.required("Insira sua nova senha!")
				.notOneOf(
					[Yup.ref("password"), null],
					"As senhas devem ser diferentes!"
				),
		otherwise: () => Yup.string(),
	}),
})
