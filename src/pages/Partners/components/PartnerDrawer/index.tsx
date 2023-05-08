import React, { useState } from "react"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Text,
} from "@chakra-ui/react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { ErrorCode, PartnerDrawerProps, PartnerValues } from "~/interfaces"
import { PARTNER_BAD_REQUEST_ERRORS } from "~/utils"
import {
	DrawerForm,
	PartnerSchema,
} from "~/pages/Partners/components/PartnerDrawer/Form"
import { DefaultAlert } from "~/components"

export const PartnerDrawer: React.FC<PartnerDrawerProps> = ({
	isVisible,
	mode,
	partner,
	onClose,
}) => {
	const [errorMessage, setErrorMessage] = useState("")
	const isCreating = mode === "create"
	const title = isCreating ? "Cadastrar novo associado" : "Editar associado"
	const [isSubmitting, setIsSubmitting] = useState(false)
	const form = useForm<PartnerValues>({
		resolver: yupResolver(PartnerSchema),
	})

	const onCloseDrawer = () => {
		if (!isSubmitting) onClose()
	}

	const handleFormError = (error: ErrorCode | undefined) => {
		const message =
			error || "Desculpe, ocorreu um erro interno. Tente novamente mais tarde."
		const badRequest = PARTNER_BAD_REQUEST_ERRORS.find(
			(item) => item.code === message
		)

		if (badRequest) form.setError(badRequest.field, { type: "custom", message })
		else setErrorMessage(message)
	}

	const onSubmit = async (values: PartnerValues) => {
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
		if (isSubmitting) return "Por favor, aguarde. Estamos enviando os dados."
		if (isCreating) return "Preencha os campos para cadastrar o novo associado."
		return "Preencha os campos para atualizar os dados do associado."
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
							partner={partner}
							onSubmit={onSubmit}
						/>
					</FormProvider>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}
