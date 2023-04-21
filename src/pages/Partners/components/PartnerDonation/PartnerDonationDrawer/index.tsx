import React, { useState } from "react"
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
} from "@chakra-ui/react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
	ErrorCode,
	PartnerDonationValues,
	NewPartnerDonationDrawerProps,
} from "~/interfaces"
import { PARTNER_DONATION_BAD_REQUEST_ERRORS } from "~/utils"
import { useIsMounted } from "~/hooks"
import {
	DrawerForm,
	NewPartnerDonationSchema,
} from "~/pages/Partners/components"
import { DefaultAlert } from "~/components"

export const NewPartnerDonationDrawer: React.FC<
	NewPartnerDonationDrawerProps
> = ({ isVisible, mode, partner, onClose }) => {
	const isMounted = useIsMounted()
	const isCreating = mode === "create"
	const title = isCreating ? "Cadastrar novo lançamento" : ""
	const [isFetching, setIsFetching] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const form = useForm<PartnerDonationValues>({
		defaultValues: { billingYear: new Date().getFullYear() },
		resolver: yupResolver(NewPartnerDonationSchema),
	})

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

	const onSubmit = async (values: PartnerDonationValues) => {
		if (errorMessage) setErrorMessage("")
		setIsSubmitting(true)

		if (isCreating) {
			/** TO DO: Call API methods... */

			setIsSubmitting(false)

			// if (error) return handleFormError(error)
			// else await fetchRecords()
		}

		onCloseDrawer()
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

	// useEffect(() => {
	// 	void fetchPartnerDonation()
	// }, [fetchPartnerDonation])

	return (
		<Drawer isOpen={isVisible} onClose={onCloseDrawer} size="md">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{title}</DrawerHeader>

				{/* {(!!isFetching || !isMounted()) && (
					<DrawerBody>
						Carregando...
						// TO DO: Add skeleton loader...
					</DrawerBody>
				)} */}

				{!isFetching && (
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
				)}
			</DrawerContent>
		</Drawer>
	)
}
