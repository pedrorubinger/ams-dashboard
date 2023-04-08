import React, { useCallback, useEffect, useState } from "react"
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
	Tenant,
	UserFormValues,
	UsersDrawerProps,
} from "~/interfaces"
import { USER_BAD_REQUEST_ERRORS } from "~/utils"
import { useIsMounted } from "~/hooks"
import { createUser, getTenants, updateUser } from "~/services"
import { UsersDrawerSchema } from "~/pages/Users/components/DrawerForm/schema"
import { DrawerForm, TenantsSkeleton } from "~/pages/Users/components"
import { DefaultAlert } from "~/components"

export const UsersDrawer: React.FC<UsersDrawerProps> = ({
	isVisible,
	mode,
	user,
	onClose,
	fetchRecords,
	...rest
}) => {
	const isMounted = useIsMounted()
	const isCreating = mode === "create"
	const title = isCreating ? "Cadastrar novo usuário" : "Editar usuário"
	const [tenants, setTenants] = useState<Tenant[]>([])
	const [isFetching, setIsFetching] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const form = useForm<UserFormValues>({
		resolver: yupResolver(UsersDrawerSchema),
	})

	const onCloseDrawer = () => {
		if (!isSubmitting) onClose()
	}

	const handleFormError = (error: ErrorCode | undefined) => {
		const message =
			error || "Desculpe, ocorreu um erro interno. Tente novamente mais tarde."
		const badRequest = USER_BAD_REQUEST_ERRORS.find(
			(item) => item.code === message
		)

		if (badRequest) form.setError(badRequest.field, { type: "custom", message })
		else setErrorMessage(message)
	}

	const onSubmit = async ({
		email,
		name,
		password,
		tenantId,
		isActive,
	}: UserFormValues) => {
		if (errorMessage) setErrorMessage("")
		setIsSubmitting(true)

		if (isCreating) {
			const role = "admin"
			const { error } = await createUser({
				isActive,
				name,
				email,
				password,
				tenantId,
				role,
			})

			setIsSubmitting(false)

			if (error) return handleFormError(error)
			else await fetchRecords()
		} else {
			/** Is editing but user data was not provided somehow. */
			if (!user) return onCloseDrawer()

			const { error } = await updateUser({
				id: user.id,
				name: user.name !== name ? name : undefined,
				tenantId,
				isActive,
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
				isCreating ? "cadastrando o novo" : "atualizando os dados do"
			} usuário.`
		}

		return `Preencha os campos abaixo para ${
			isCreating ? "cadastrar um novo" : "editar os dados do"
		} usuário`
	}

	const fetchTenants = useCallback(async () => {
		setIsFetching(true)

		const { data, error: error } = await getTenants()

		setIsFetching(false)

		if (error) setErrorMessage(error)
		if (data) setTenants(data.tenants)
	}, [])

	useEffect(() => {
		void fetchTenants()
	}, [fetchTenants])

	useEffect(() => {
		form.reset({ isCreating })
	}, [isCreating])

	return (
		<Drawer {...rest} isOpen={isVisible} onClose={onCloseDrawer} size="md">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{title}</DrawerHeader>

				{(!!isFetching || !isMounted()) && (
					<DrawerBody>
						<TenantsSkeleton />
					</DrawerBody>
				)}

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
								mode={mode}
								user={user}
								tenants={tenants}
								isSubmitting={isSubmitting}
								onSubmit={onSubmit}
							/>
						</FormProvider>
					</DrawerBody>
				)}
			</DrawerContent>
		</Drawer>
	)
}
