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

import { ErrorCode, TenantFormValues, TenantsDrawerProps } from "~/interfaces"
import { createTenant, updateTenant } from "~/services/requests"
import { TENANT_BAD_REQUEST_ERRORS } from "~/utils"
import { TenantsDrawerSchema } from "~/pages/Tenants/components/DrawerForm/schema"
import { DrawerForm } from "~/pages/Tenants/components"
import { DefaultAlert } from "~/components"

export const TenantsDrawer: React.FC<TenantsDrawerProps> = ({
	isVisible,
	mode,
	tenant,
	onClose,
	fetchRecords,
	...rest
}) => {
	const isCreating = mode === "create"
	const title = isCreating ? "Cadastrar nova instituição" : "Editar instituição"
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const form = useForm<TenantFormValues>({
		resolver: yupResolver(TenantsDrawerSchema),
	})

	const onCloseDrawer = () => {
		if (!isSubmitting) onClose()
	}

	const handleFormError = (error: ErrorCode | undefined) => {
		const message =
			error || "Desculpe, ocorreu um erro interno. Tente novamente mais tarde."
		const badRequest = TENANT_BAD_REQUEST_ERRORS.find(
			(item) => item.code === message
		)

		if (badRequest) form.setError(badRequest.field, { type: "custom", message })
		else setErrorMessage(message)
	}

	const onSubmit = async ({
		name,
		responsible,
		isActive,
	}: TenantFormValues) => {
		console.log("tenant", tenant, isActive)
		if (errorMessage) setErrorMessage("")
		setIsSubmitting(true)

		if (isCreating) {
			const { error } = await createTenant({ name, responsible, isActive })

			setIsSubmitting(false)

			if (error) return handleFormError(error)
			else await fetchRecords()
		} else {
			/** Is editing but tenant data was not provided. */
			if (!tenant) return onCloseDrawer()

			const { error } = await updateTenant({
				id: tenant.id,
				isActive: tenant.isActive !== isActive ? isActive : undefined,
				name: tenant.name !== name ? name : undefined,
				responsible:
					tenant.responsible !== responsible ? responsible : undefined,
			})

			setIsSubmitting(false)

			if (error) return handleFormError(error)
			else await fetchRecords()
		}

		onCloseDrawer()
	}

	const getDescription = () => {
		if (isSubmitting) {
			return `Por favor, aguarde. Estamos ${
				isCreating ? "cadastrando a nova" : "atualizando os dados da"
			} instituição.`
		}

		return `Preencha os campos abaixo para ${
			isCreating ? "cadastrar uma nova" : "editar os dados da"
		} instituição`
	}

	return (
		<Drawer {...rest} isOpen={isVisible} onClose={onCloseDrawer} size="md">
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
							mode={mode}
							tenant={tenant}
							isSubmitting={isSubmitting}
							onSubmit={onSubmit}
						/>
					</FormProvider>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}
