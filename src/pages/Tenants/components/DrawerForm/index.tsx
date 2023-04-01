import React from "react"
import { useFormContext } from "react-hook-form"
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react"

import { TenantFormValues, TenantsDrawerProps } from "~/interfaces"
import { Form, InputLabel } from "~/components"

interface Props extends Pick<TenantsDrawerProps, "mode"> {
	isSubmitting: boolean
	onSubmit: (values: TenantFormValues) => Promise<void>
}

export const DrawerForm: React.FC<Props> = ({
	mode,
	isSubmitting,
	onSubmit,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useFormContext<TenantFormValues>()
	const isCreating = mode === "create"

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

			<Button
				colorScheme="primary"
				type="submit"
				title={
					isCreating
						? "Cadastrar instituição"
						: "Atualizar dados da instituição"
				}
				isLoading={isSubmitting}
				isDisabled={isSubmitting}
				mt={6}
			>
				Cadastrar
			</Button>
		</Form>
	)
}
