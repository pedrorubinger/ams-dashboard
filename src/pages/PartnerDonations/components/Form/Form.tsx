import React from "react"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react"
import { Eraser, MagnifyingGlass } from "phosphor-react"
import { useFormContext } from "react-hook-form"

import { PartnerDonationSearchValues as Values } from "~/interfaces"
import { FilterButton } from "~/pages/PartnerDonations/components/Form/styles"
import { Form, InputLabel, Tooltip } from "~/components"

interface Props {
	fetchRecords: (values?: Values) => Promise<void>
	isLoading: boolean
}

export const ReportsDateFilter: React.FC<Props> = ({
	fetchRecords,
	isLoading,
}) => {
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { errors, defaultValues, isDirty },
	} = useFormContext<Values>()
	const isSearchButtonDisabled = !watch("date") || isLoading

	const onSubmit = async (values: Values): Promise<void> => {
		await fetchRecords(values)
	}

	const onReset = async () => {
		setValue("date", defaultValues?.date || "")
		await fetchRecords()
	}

	const getResetButtonDescription = () => {
		if (isLoading) return "Aguarde a busca ser finalizada para limpar os campos"
		return "Clique para remover os filtros ativos"
	}

	const getSearchButtonDescription = () => {
		if (isLoading) return "Aguarde a busca ser finalizada para realizar outra"
		if (isSearchButtonDisabled) return "Preencha o campo para filtrar a busca"
		return "Clique ou pressione enter no campo para filtrar a busca por data"
	}

	return (
		<Box mt={8} mb={4}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.date} width="lg">
					<InputLabel htmlFor="date">Filtrar por datas</InputLabel>

					<InputGroup>
						<InputLeftElement>
							<Tooltip
								label={getResetButtonDescription()}
								placement="top-start"
							>
								<FilterButton
									isDisabled={isLoading}
									icon={<Eraser size={14} />}
									marginBottom={2}
									aria-label="Desfazer filtros"
									type="button"
									size="sm"
									onClick={onReset}
								/>
							</Tooltip>
						</InputLeftElement>
						<Input
							id="date"
							type="text"
							placeholder="Digite o que deseja filtrar"
							{...register("date")}
							borderRadius="none"
							size="sm"
							paddingLeft="50px"
							_focus={{ border: "inherit" }}
							isDisabled={isLoading}
						/>
						<InputRightElement>
							<Tooltip
								label={getSearchButtonDescription()}
								placement="top-start"
							>
								<FilterButton
									isDisabled={isSearchButtonDisabled}
									icon={<MagnifyingGlass size={14} />}
									marginBottom={2}
									aria-label="Pesquisar"
									type="submit"
									size="sm"
								/>
							</Tooltip>
						</InputRightElement>
					</InputGroup>

					<FormErrorMessage>
						{errors.date && errors.date.message}
					</FormErrorMessage>
				</FormControl>
			</Form>
		</Box>
	)
}
