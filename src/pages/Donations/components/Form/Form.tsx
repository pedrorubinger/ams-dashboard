import React, { useState } from "react"
import {
	Box,
	FormControl,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react"
import { Eraser, MagnifyingGlass } from "phosphor-react"
import { useFormContext } from "react-hook-form"
import { RangeDatepicker } from "chakra-dayzed-datepicker"

import { DonationSearchValues as Values } from "~/interfaces"
import { FilterButton } from "~/pages/Donations/components/Form/styles"
import { Form, InputLabel, Tooltip } from "~/components"

interface Props {
	fetchRecords: (values?: Values) => Promise<void>
	isLoading: boolean
	hasActiveFilter: boolean
}

export const ReportsDateFilter: React.FC<Props> = ({
	fetchRecords,
	hasActiveFilter,
	isLoading,
}) => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, defaultValues, isDirty },
	} = useFormContext<Values>()
	const [selected, setSelected] = useState<Date[]>([])
	const isSearchButtonDisabled = isLoading || selected.length !== 2

	const onSubmit = async (values: Values): Promise<void> => {
		await fetchRecords(values)
	}

	const onReset = async () => {
		setValue("date", defaultValues?.date || "")
		setSelected([])

		if (hasActiveFilter) await fetchRecords()
	}

	const getResetButtonDescription = () => {
		if (isLoading) return "Aguarde a busca ser finalizada para limpar os campos"
		return "Clique para remover os filtros ativos"
	}

	const getSearchButtonDescription = () => {
		if (isLoading) return "Aguarde a busca ser finalizada para realizar outra"
		if (isSearchButtonDisabled) return "Selecione as datas para filtrar a busca"
		return "Clique para filtrar a busca por data"
	}

	return (
		<Box mt={8} mb={4}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.date} width="sm">
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
									onClick={onReset}
								/>
							</Tooltip>
						</InputLeftElement>

						<RangeDatepicker
							id="date"
							propsConfigs={{
								dayOfMonthBtnProps: {
									defaultBtnProps: {
										borderColor: "gray.200",
										_hover: {
											background: "gray.300",
										},
									},
									isInRangeBtnProps: {
										background: "orange.100",
									},
									selectedBtnProps: {
										background: "azure",
										borderColor: "ActiveBorder",
									},
								},
								inputProps: {
									isDisabled: isLoading,
									size: "sm",
									paddingLeft: "50px",
									_focus: { border: "inherit" },
									borderRadius: "none",
									placeholder: "Selecione um intervalo de datas",
									...register("date"),
								},
							}}
							configs={{ dateFormat: "dd/MM/yyyy" }}
							selectedDates={selected}
							maxDate={new Date()}
							onDateChange={setSelected}
							usePortal
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
