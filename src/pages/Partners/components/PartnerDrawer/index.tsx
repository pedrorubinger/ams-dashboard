import React from "react"
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

import { PartnerDrawerProps, PartnerValues } from "~/interfaces"
import { usePartnerUpdater } from "~/pages/Partners/hooks"
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
	const title = isCreating ? "Cadastrar novo associado" : "Editar associado"
	const form = useForm<PartnerValues>({
		defaultValues,
		resolver: yupResolver(PartnerSchema),
	})

	const { isSubmitting, errorMessage, submit } = usePartnerUpdater({
		mode,
		form,
		partner,
	})

	const onCloseDrawer = () => {
		if (!isSubmitting) onClose()
	}

	const onSubmit = async (values: PartnerValues) => {
		const { success } = await submit({
			autoRegistrationId: values.autoRegistrationId,
			id:
				!isCreating && partner?.registrationId === values.id
					? undefined
					: values.id,
			name: values.name,
		})

		if (success) onCloseDrawer()
	}

	const getDescription = () => {
		const registrationIdMessage = (
			<>
				Caso opte por inserir um número de matrícula manualmente,&nbsp;
				<strong>você assume o risco de cadastrar matrículas repetidas</strong>.
			</>
		)

		if (isSubmitting) return "Por favor, aguarde. Estamos enviando os dados."

		if (isCreating) {
			return (
				<>
					Preencha os campos para cadastrar o novo associado.&nbsp;
					{registrationIdMessage}
				</>
			)
		}

		return (
			<>
				Preencha os campos para atualizar os dados do associado.&nbsp;
				{registrationIdMessage}
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
							isVisible={!!errorMessage}
							message={errorMessage}
							mb={5}
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
