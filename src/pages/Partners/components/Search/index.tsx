import {
	Box,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	Grid,
	Input,
	Select,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"

import { SearchPartnerValues } from "~/interfaces"
import { Form, InputLabel } from "~/components"
import { searchOptions } from "~/pages/Partners/utils/constants"

interface Props {}

export const SearchPartner: React.FC<Props> = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
	} = useFormContext<SearchPartnerValues>()

	const onSubmit = async (values: SearchPartnerValues): Promise<void> => {}

	return (
		<Box mt={8} mb={10}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Flex gap="15px" flexWrap="wrap">
					<FormControl isInvalid={!!errors.type} width="xs" isRequired>
						<InputLabel htmlFor="type">Filtro</InputLabel>

						<Select
							id="type"
							variant="outline"
							placeholder="Selecione um filtro"
							{...register("type")}
						>
							{searchOptions.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</Select>

						<FormErrorMessage>
							{errors.type && errors.type.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isRequired isInvalid={!!errors.value} width="lg">
						<InputLabel htmlFor="value">Pesquisar por</InputLabel>

						<Input
							id="value"
							type="text"
							placeholder="Digite o que deseja filtrar"
							{...register("value")}
							isDisabled={isSubmitting}
						/>
						<FormErrorMessage>
							{errors.value && errors.value.message}
						</FormErrorMessage>
					</FormControl>
				</Flex>
			</Form>
		</Box>
	)
}
