import React, { useState } from "react"
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
import { useFormContext } from "react-hook-form"
import { MagnifyingGlass } from "phosphor-react"

import { SearchPartnerValues } from "~/interfaces"
import { Form, InputLabel } from "~/components"
import { searchOptions } from "~/pages/Partners/utils/constants"
import { SearchButton } from "~/pages/Partners/components/Search/styles"

interface Props {
	isLoading: boolean
	fetchRecords: (params: SearchPartnerValues) => Promise<void>
}

export const SearchPartner: React.FC<Props> = ({ isLoading, fetchRecords }) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
	} = useFormContext<SearchPartnerValues>()

	const onSubmit = async (values: SearchPartnerValues): Promise<void> => {
		await fetchRecords(values)
	}

	return (
		<Box mt={8} mb={4}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Flex gap="15px" flexWrap="wrap">
					<FormControl isInvalid={!!errors.type} width="xs" isRequired>
						<InputLabel htmlFor="type">Filtro</InputLabel>

						<Select
							id="type"
							variant="outline"
							placeholder="Selecione um filtro"
							size="sm"
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
								borderRadius="none"
								size="sm"
								_focus={{ border: "inherit" }}
								isDisabled={isLoading}
							/>
							<InputRightElement>
								<SearchButton
									isDisabled={isLoading}
									icon={<MagnifyingGlass size={14} />}
									marginBottom={2}
									title="Clique ou pressione enter para buscar um associado"
									aria-label="Pesquisar"
									type="submit"
									size="sm"
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
