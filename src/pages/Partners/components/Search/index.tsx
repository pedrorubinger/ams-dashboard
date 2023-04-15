import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
	Select,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { MagnifyingGlass } from "phosphor-react"

import { SearchPartnerValues } from "~/interfaces"
import { Form, InputLabel } from "~/components"
import { searchOptions } from "~/pages/Partners/utils/constants"
import { SearchButton } from "~/pages/Partners/components/Search/styles"

interface Props {
	isLoading: boolean
}

export const SearchPartner: React.FC<Props> = ({ isLoading }) => {
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
							isDisabled={isLoading}
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

						<InputGroup>
							<Input
								id="value"
								type="text"
								placeholder="Digite o que deseja filtrar"
								{...register("value")}
								borderRight="none"
								borderEndRadius="none"
								isDisabled={isLoading}
							/>
							<InputRightElement>
								<SearchButton
									isDisabled={isLoading}
									icon={<MagnifyingGlass size={14} />}
									title="Clique ou pressione enter para buscar um associado"
									aria-label="Pesquisar"
									type="submit"
								/>
							</InputRightElement>
						</InputGroup>

						<FormErrorMessage>
							{errors.value && errors.value.message}
						</FormErrorMessage>
					</FormControl>
				</Flex>
			</Form>
		</Box>
	)
}
