import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	Input,
} from "@chakra-ui/react"

import { TenantFormValues, TenantsDrawerProps } from "~/interfaces"
import { Form, InputLabel } from "~/components"

interface Props extends Pick<TenantsDrawerProps, "mode" | "tenant"> {
	isSubmitting: boolean
	onSubmit: (values: TenantFormValues) => Promise<void>
}

export const DrawerForm: React.FC<Props> = ({
	mode,
	isSubmitting,
	tenant,
	onSubmit,
}) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isDirty },
	} = useFormContext<TenantFormValues>()
	const isCreating = mode === "create"

	useEffect(() => {
		if (tenant && !isCreating) {
			reset({
				name: tenant.name,
				responsible: tenant.responsible,
				isActive: tenant.isActive,
			})
		}
	}, [tenant, isCreating])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isRequired isInvalid={!!errors.name}>
				<InputLabel htmlFor="name">Nome da instituição</InputLabel>

				<Input
					id="name"
					type="text"
					placeholder="Nome da instituição"
					{...register("name")}
					disabled={isSubmitting}
					autoFocus
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors.responsible} mt={5}>
				<InputLabel htmlFor="responsible">Nome do responsável</InputLabel>

				<Input
					id="responsible"
					type="text"
					placeholder="Nome do responsável pela instituição"
					{...register("responsible")}
					disabled={isSubmitting}
				/>
				<FormErrorMessage>
					{errors.responsible && errors.responsible.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.isActive} mt="5" width="md">
				<Checkbox
					disabled={isSubmitting}
					defaultChecked={isCreating ? true : tenant?.isActive}
					id="isActive"
					{...register("isActive")}
				>
					Está ativa
				</Checkbox>
			</FormControl>

			<Button
				colorScheme="primary"
				type="submit"
				title={
					isCreating
						? "Cadastrar instituição"
						: "Atualizar dados da instituição"
				}
				isLoading={isSubmitting}
				isDisabled={isSubmitting || (!isCreating && !isDirty)}
				mt={6}
			>
				{isCreating ? "Cadastrar" : "Salvar alterações"}
			</Button>
		</Form>
	)
}
