import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import {
	Button,
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
		control,
		formState: { errors, isDirty },
	} = useFormContext<PartnerDonationValues>()

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
