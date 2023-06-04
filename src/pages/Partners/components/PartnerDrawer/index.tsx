import React, { useContext, useState } from "react"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Text,
	useToast,
} from "@chakra-ui/react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { createPartner } from "~/services"
import { PartnerContext } from "~/contexts"
import {
	ErrorCode,
	FindPartnerField,
	PartnerDrawerProps,
	PartnerValues,
} from "~/interfaces"
import { PARTNER_BAD_REQUEST_ERRORS, TOAST_OPTIONS } from "~/utils"
import {
	DrawerForm,
	PartnerSchema,
} from "~/pages/Partners/components/PartnerDrawer/Form"
import { DefaultAlert } from "~/components"

const defaultValues: PartnerValues = {
	id: "",
	name: "",
	autoRegistrationId: true,
}

export const PartnerDrawer: React.FC<PartnerDrawerProps> = ({
	isVisible,
	mode,
	partner,
	onClose,
}) => {
	const isCreating = mode === "create"
	const isUpdating = mode === "update"
	const title = isCreating ? "Cadastrar novo associado" : "Editar associado"
	const [errorMessage, setErrorMessage] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const toast = useToast()
	const { findPartner } = useContext(PartnerContext)
	const form = useForm<PartnerValues>({
		defaultValues,
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

	const fireSuccessToast = (name: string) =>
		toast({
			...TOAST_OPTIONS,
			title: "Associado cadastrado!",
			description: `O associado ${name} foi cadastrado com sucesso.`,
			status: "success",
		})

	const onSubmit = async ({ autoRegistrationId, id, name }: PartnerValues) => {
		if (errorMessage) setErrorMessage("")

		setIsSubmitting(true)

		if (isCreating) {
			const { success, data, error } = await createPartner({
				id: autoRegistrationId ? undefined : id,
				name,
			})

			setIsSubmitting(false)

			if (error) return handleFormError(error)
			if (success && data) {
				fireSuccessToast(name)
				onCloseDrawer()
				return findPartner({
					field: FindPartnerField.ID,
					content: data.partner.registrationId,
				})
			}
		}

		if (isUpdating) {
			//
		}

		onCloseDrawer()
	}

	const getDescription = () => {
		const registrationIdMessage =
			"Caso opte por inserir um número de matrícula manualmente, você assume o risco de cadastrar matrículas repetidas."

		if (isSubmitting) return "Por favor, aguarde. Estamos enviando os dados."

		if (isCreating) {
			return `Preencha os campos para cadastrar o novo associado. ${registrationIdMessage}`
		}

		return `Preencha os campos para atualizar os dados do associado. ${registrationIdMessage}`
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
