import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react"

import { PartnerValues, PartnerDrawerProps } from "~/interfaces"
import { Form, InputLabel } from "~/components"

interface Props extends Pick<PartnerDrawerProps, "mode" | "partner"> {
	isSubmitting: boolean
	onSubmit: (values: PartnerValues) => Promise<void>
}

export const DrawerForm: React.FC<Props> = ({
	mode,
	partner,
	isSubmitting,
	onSubmit,
}) => {
	const isCreating = mode === "create"
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isDirty },
	} = useFormContext<PartnerValues>()

	useEffect(() => {
		if (partner && !isCreating) {
			reset({
				name: partner.name,
				id: partner.id,
			})
		}
	}, [partner, isCreating])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl mt={5} isInvalid={!!errors.id} isRequired>
				<InputLabel htmlFor="id">Número da matrícula</InputLabel>

				<Input
					type="number"
					id="id"
					min="0"
					placeholder="Informe a matrícula"
					{...register("id")}
				/>

				<FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
			</FormControl>

			<FormControl mt={5} isInvalid={!!errors.name} isRequired>
				<InputLabel htmlFor="name">Nome do associado</InputLabel>

				<Input
					type="text"
					id="name"
					placeholder="Informe o nome do associado"
					{...register("name")}
				/>

				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				colorScheme="primary"
				type="submit"
				title={isCreating ? "Cadastrar associado" : "Atualizar dados"}
				isLoading={isSubmitting}
				isDisabled={isSubmitting || (!isCreating && !isDirty)}
				mt={6}
			>
				{isCreating ? "Cadastrar" : "Salvar alterações"}
			</Button>
		</Form>
	)
}
