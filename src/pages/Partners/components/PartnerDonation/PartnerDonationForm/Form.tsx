import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	IconButton,
	Input,
	InputGroup,
	Select,
} from "@chakra-ui/react"
import { NumericFormat } from "react-number-format"
import { MinusCircle, PlusCircle } from "phosphor-react"

import {
	PartnerDonationValues,
	NewPartnerDonationDrawerProps,
	PartnerDonationBillingMonthOption as MonthOption,
	PartnerDonationBillingMonth as MonthValue,
} from "~/interfaces"
import {
	partnerDonationOptions,
	partnerDonationBillingMonthOptions,
} from "~/pages/Partners/utils"
import { Form, InputLabel } from "~/components"

interface Props extends Pick<NewPartnerDonationDrawerProps, "mode"> {
	isSubmitting: boolean
	onSubmit: (values: PartnerDonationValues) => Promise<void>
}

export const DrawerForm: React.FC<Props> = ({
	mode,
	isSubmitting,
	onSubmit,
}) => {
	const isCreating = mode === "create"
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isDirty, defaultValues },
	} = useFormContext<PartnerDonationValues>()

	const [months, setMonths] = useState(1)

	const onUpsertMonth = (action: "remove" | "include") => {
		const isIncluding = action === "include"

		setMonths((prev) => (isIncluding ? ++prev : --prev))
		// setValue("")
	}

	const getIconButtonDescription = (isFirstItem: boolean) => {
		if (isFirstItem) {
			return "Você não pode remover este mês. Selecione pelo menos um"
		}

		if (isSubmitting) return "Aguarde a finalização do envio"
		return "Clique para remover este mês"
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl mt={5} isInvalid={!!errors.category} isRequired>
				<InputLabel htmlFor="category">Categoria</InputLabel>

				<Select
					id="category"
					variant="outline"
					placeholder="Selecione uma categoria"
					{...register("category")}
				>
					{partnerDonationOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>

				<FormErrorMessage>
					{errors.category && errors.category.message}
				</FormErrorMessage>
			</FormControl>

			{new Array(months).fill(undefined).map((_, index: number) => {
				const hasOneItem = months === 1
				const isRemoveItemButtonDisabled = hasOneItem || isSubmitting
				const cursor = isRemoveItemButtonDisabled ? "not-allowed" : "pointer"

				return (
					<InputGroup gap={3} key={index}>
						<FormControl mt={5} isInvalid={!!errors.billingMonth} isRequired>
							<InputLabel htmlFor="billingMonth">Mês da competência</InputLabel>
							<Select
								id="billingMonth"
								variant="outline"
								placeholder="Selecione um mês"
								{...register("billingMonth")}
							>
								{partnerDonationBillingMonthOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Select>
						</FormControl>

						<Flex mt={5} alignItems="center">
							<FormControl
								flex={1}
								mr={3}
								isInvalid={!!errors.billingYear}
								isRequired
							>
								<InputLabel htmlFor="billingYear">Ano</InputLabel>
								<Input
									type="number"
									id="billingYear"
									min="0"
									placeholder="Informe o ano"
									{...register("billingYear")}
								/>
							</FormControl>

							<Box margin="auto" marginBottom={0}>
								<IconButton
									colorScheme="red"
									aria-label="remover mês"
									title={getIconButtonDescription(hasOneItem)}
									icon={<MinusCircle size={16} cursor={cursor} />}
									isDisabled={isRemoveItemButtonDisabled}
									cursor={cursor}
									onClick={
										hasOneItem ? undefined : () => onUpsertMonth("remove")
									}
								/>
							</Box>
						</Flex>
					</InputGroup>
				)
			})}

			<Button
				colorScheme="green"
				type="button"
				title="Clique para adicionar mais um mês de competência para este lançamento"
				size="xs"
				isLoading={isSubmitting}
				isDisabled={isSubmitting}
				rightIcon={<PlusCircle />}
				onClick={() => onUpsertMonth("include")}
				mt={3}
			>
				Adicionar novo
			</Button>

			<FormControl isRequired isInvalid={!!errors.value} mt={5}>
				<InputLabel htmlFor="value">Valor do lançamento</InputLabel>

				<InputGroup>
					<Controller
						control={control}
						name="value"
						render={({ field: { onChange, name, value } }) => (
							<Input
								decimalScale={2}
								allowNegative={false}
								allowLeadingZeros={false}
								id="value"
								prefix="R$ "
								placeholder="R$"
								thousandSeparator="."
								decimalSeparator=","
								as={NumericFormat}
								onChange={onChange}
								name={name}
								value={value}
							/>
						)}
					/>
				</InputGroup>

				<FormErrorMessage>
					{errors.value && errors.value.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				colorScheme="primary"
				type="submit"
				title={isCreating ? "Cadastrar lançamento" : ""}
				mt={6}
				isLoading={isSubmitting}
				isDisabled={isSubmitting || (!isCreating && !isDirty)}
			>
				{isCreating ? "Cadastrar" : "Salvar alterações"}
			</Button>
		</Form>
	)
}
