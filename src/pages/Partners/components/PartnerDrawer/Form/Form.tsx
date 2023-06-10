import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	Input,
	Text,
} from "@chakra-ui/react"

import { PartnerValues, PartnerDrawerProps } from "~/interfaces"
import { Form, InputLabel, Tooltip } from "~/components"

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
		watch,
		formState: { errors, isDirty },
	} = useFormContext<PartnerValues>()
	const watchedAutoRegistrationId = watch("autoRegistrationId")

	useEffect(() => {
		if (partner && !isCreating) {
			reset({
				name: partner.name,
				id: partner.registrationId,
				autoRegistrationId: false,
			})
		}
	}, [partner, isCreating])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.autoRegistrationId} mt="5" width="100%">
				<Checkbox
					id="autoRegistrationId"
					disabled={isSubmitting}
					isChecked={watchedAutoRegistrationId}
					{...register("autoRegistrationId")}
				>
					<Text width="100%" display="flex" alignItems="center" gap={2}>
						Gerar a matrícula automaticamente
						<Tooltip
							label="Ao selecionar esta opção, o número de matrícula deste associado será gerado automaticamente baseado no número de matrícula do último associado cadastrado. Caso seja o primeiro, a matrícula será '1'."
							placement="top-start"
						/>
					</Text>
				</Checkbox>
			</FormControl>

			{!watchedAutoRegistrationId && (
				<FormControl mt={5} isInvalid={!!errors.id} isRequired>
					<InputLabel htmlFor="id">Número da matrícula</InputLabel>

					<Input
						type="number"
						id="id"
						min="0"
						placeholder="Informe a matrícula"
						{...register("id")}
						disabled={watchedAutoRegistrationId}
					/>

					<FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
				</FormControl>
			)}

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
