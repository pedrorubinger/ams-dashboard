import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	Select,
} from "@chakra-ui/react"
import { NumericFormat } from "react-number-format"

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

	const [selectedMonths, setSelectedMonths] = useState<MonthValue[]>(
		(defaultValues?.billingMonth || []) as MonthValue[]
	)

	const onSelectMonth = ({ value }: MonthOption) => {
		const pop = (months: MonthValue[]) => {
			const values = months.filter((m) => m !== value)

			setValue("billingMonth", values)
			return values
		}

		const push = (months: MonthValue[]) => {
			const values = [...months, value]

			setValue("billingMonth", values)
			return values
		}

		setSelectedMonths((prev) => (prev.includes(value) ? pop(prev) : push(prev)))
	}

	console.log("selectedMonths", selectedMonths)

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

			<FormControl mt={5} isInvalid={!!errors.billingYear} isRequired>
				<InputLabel htmlFor="billingYear">Ano da competência</InputLabel>

				<Input
					type="number"
					id="billingYear"
					min="0"
					placeholder="Informe o ano"
					{...register("billingYear")}
				/>

				<FormErrorMessage>
					{errors.billingYear && errors.billingYear.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl mt={5} isInvalid={!!errors.billingMonth} isRequired>
				<InputLabel htmlFor="billingMonth">Mês da competência</InputLabel>

				{/* <Select
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
				</Select> */}

				<Flex gap={2} flexWrap="wrap">
					{partnerDonationBillingMonthOptions.map((month) => {
						const isSelected = selectedMonths.includes(month.value)

						return (
							<Button
								size="sm"
								key={month.value}
								colorScheme={isSelected ? "green" : undefined}
								onClick={() => onSelectMonth(month)}
							>
								{month.label}
							</Button>
						)
					})}
				</Flex>

				<FormErrorMessage>
					{errors.billingMonth && errors.billingMonth.message}
				</FormErrorMessage>
			</FormControl>

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
				isLoading={isSubmitting}
				isDisabled={isSubmitting || (!isCreating && !isDirty)}
				mt={6}
			>
				{isCreating ? "Cadastrar" : "Salvar alterações"}
			</Button>
		</Form>
	)
}
