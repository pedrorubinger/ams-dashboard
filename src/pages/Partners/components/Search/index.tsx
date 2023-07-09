import React, { useContext, useEffect } from "react"
import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Select,
	Tooltip,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import { Eraser, MagnifyingGlass } from "phosphor-react"

import { PartnerContext } from "~/contexts"
import { SearchPartnerValues } from "~/interfaces"
import { DefaultAlert, Form, InputLabel } from "~/components"
import { searchOptions } from "~/pages/Partners/utils/constants"
import { SearchButton as FilterButton } from "~/pages/Partners/components/Search/styles"

interface Props {}

export const SearchPartner: React.FC<Props> = () => {
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { defaultValues, errors, isDirty },
	} = useFormContext<SearchPartnerValues>()
	const type = watch("field")
	const { error, isFetching, clearRecords, findPartner, fetchPartners } =
		useContext(PartnerContext)
	const isClearButtonDisabled = isFetching || !!error

	const onSubmit = async (values: SearchPartnerValues): Promise<void> => {
		clearRecords()
		await findPartner(values)
	}

	const onReset = async () => {
		setValue("content", defaultValues?.content || "")
		clearRecords()
		await fetchPartners({ hasPagination: true })
	}

	useEffect(() => {
		setValue("content", defaultValues?.content || "")
	}, [type])

	return (
		<Box mt={8} mb={4}>
			<DefaultAlert
				status="error"
				mb={5}
				isVisible={!!error}
				message={error as string}
			/>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<Flex gap="15px" flexWrap="wrap">
					<FormControl isInvalid={!!errors.field} width="xs" isRequired>
						<InputLabel htmlFor="field">Filtro</InputLabel>

						<Select
							id="field"
							variant="outline"
							placeholder="Selecione um filtro"
							size="sm"
							{...register("field")}
							isDisabled={isFetching}
						>
							{searchOptions.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</Select>

						<FormErrorMessage>
							{errors.field && errors.field.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isRequired isInvalid={!!errors.content} width="lg">
						<InputLabel htmlFor="content">Pesquisar por</InputLabel>

						<InputGroup>
							<InputLeftElement>
								<Tooltip
									label="Clique para limpar os filtros e recarregar a listagem"
									placement="top-start"
								>
									<FilterButton
										isDisabled={isClearButtonDisabled}
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
								id="content"
								type="text"
								placeholder="Digite o que deseja filtrar"
								{...register("content")}
								borderRight="none"
								borderRadius="none"
								size="sm"
								_focus={{ border: "inherit" }}
								paddingLeft="50px"
								isDisabled={isFetching}
							/>
							<InputRightElement>
								<FilterButton
									isDisabled={isFetching}
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
							{errors.content && errors.content.message}
						</FormErrorMessage>
					</FormControl>
				</Flex>
			</Form>
		</Box>
	)
}
