import React, { useState } from "react"
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	useToast,
} from "@chakra-ui/react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { createDonation } from "~/services"
import { ErrorCode, DonationValues, NewDonationDrawerProps } from "~/interfaces"
import {
	convertCurrencyToNumber,
	PARTNER_DONATION_BAD_REQUEST_ERRORS,
	TOAST_OPTIONS,
} from "~/utils"
import { partnerDonationDrawerFormDefaultValues as defaultValues } from "~/pages/Partners/utils"
import { DrawerForm, NewDonationSchema } from "~/pages/Partners/components"
import { DefaultAlert } from "~/components"

export const NewDonationDrawer: React.FC<NewDonationDrawerProps> = ({
	isVisible,
	mode,
	partner,
	onClose,
}) => {
	const isCreating = mode === "create"
	const title = isCreating ? "Cadastrar novo lançamento" : ""
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const form = useForm<DonationValues>({
		defaultValues,
		reValidateMode: "onChange",
		resolver: yupResolver(NewDonationSchema),
	})
	const toast = useToast()

	const onCloseDrawer = () => {
		if (!isSubmitting) onClose()
	}

	const handleFormError = (error: ErrorCode | undefined) => {
		const message =
			error || "Desculpe, ocorreu um erro interno. Tente novamente mais tarde."
		const badRequest = PARTNER_DONATION_BAD_REQUEST_ERRORS.find(
			(item) => item.code === message
		)

		if (badRequest) form.setError(badRequest.field, { type: "custom", message })
		else setErrorMessage(message)
	}

	const onSubmit = async (values: DonationValues) => {
		if (errorMessage) setErrorMessage("")
		setIsSubmitting(true)

		if (isCreating) {
			const { error } = await createDonation({
				partnerId: partner.id,
				billingDate: values.billingDate,
				category: values.category,
				description: values.description,
				value: convertCurrencyToNumber(values.value) * 100,
			})

			setIsSubmitting(false)

			if (error) return handleFormError(error)

			toast({
				...TOAST_OPTIONS,
				status: "success",
				title: "Lançamento realizado!",
				description: `O lançamento no valor de ${values.value} para o associado ${partner.name} foi realizado com sucesso!`,
			})
			onCloseDrawer()
		}
	}

	const getDescription = () => {
		if (isSubmitting) {
			return `Por favor, aguarde. Estamos ${
				isCreating ? "cadastrando o novo" : "atualizando os dados do"
			} lançamento.`
		}

		return (
			<>
				Preencha os campos abaixo para&nbsp;
				{isCreating ? "cadastrar um novo" : "editar os dados do"} lançamento
				para o associado <strong>{partner.name}</strong>.
			</>
		)
	}

	return (
		<Drawer isOpen={isVisible} onClose={onCloseDrawer} size="md">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{title}</DrawerHeader>

				<DrawerBody>
					{errorMessage ? (
						<DefaultAlert
							status="error"
							mb={5}
							isVisible={!!errorMessage}
							message={errorMessage}
						/>
					) : (
						<Text mb="5">{getDescription()}</Text>
					)}

					<FormProvider {...form}>
						<DrawerForm
							isSubmitting={isSubmitting}
							mode={mode}
							onSubmit={onSubmit}
						/>
					</FormProvider>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}
