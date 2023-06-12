import React, { useState } from "react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import {
	Box,
	Button,
	Divider,
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
	DonationValues,
	NewDonationDrawerProps,
	DonationBillingMonthOption as MonthOption,
	DonationBillingMonth as MonthValue,
} from "~/interfaces"
import {
	partnerDonationOptions,
	partnerDonationBillingMonthOptions,
} from "~/pages/Partners/utils"
import { Form, InputLabel } from "~/components"

interface Props extends Pick<NewDonationDrawerProps, "mode"> {
	isSubmitting: boolean
	onSubmit: (values: DonationValues) => Promise<void>
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
		setError,
		clearErrors,
		setValue,
		control,
		formState: { errors, isDirty, defaultValues },
	} = useFormContext<DonationValues>()
	const { fields, append, remove } = useFieldArray({
		name: "billingDate" as never,
		control,
	})

	const isValidMonth = (month: string) => {
		const monthNum = parseInt(month, 10)
		return monthNum >= 1 && monthNum <= 12
	}

	const isValidYear = (year: string) => {
		const yearNum = parseInt(year, 10)
		return yearNum >= 1900 && yearNum <= 2300
	}

	console.log("errors", errors)

	const onChangeBillingDate = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const field = `billingDate.${index}` as keyof DonationValues
		const raw = e.target.value
		const lastChar = raw.slice(-1)
		let value = raw.replace(/\D/g, "")
		const hasTypedMonth = value.length >= 2

		const invalidate = () =>
			setError(`billingDate.${index}`, {
				type: "custom",
				message: "Insira uma data válida!",
			})

		if (!value) {
			return setValue(field, "")
		}

		if (![0, 1].includes(Number(value?.[0]))) {
			return setValue(field, `${["1", "2"].includes(value) ? 1 : 0}${value}`)
		}

		if (value === "00") {
			return setValue(field, "0")
		}

		const month: string = value.slice(0, 2)

		if (parseInt(month) > 12) {
			return setValue(field, 12)
		}

		const year = value.slice(2)

		if (value.length >= 3 && lastChar === "/") {
			return setValue(field, `${month}/${year}`)
		}

		if (hasTypedMonth && lastChar !== "/") {
			value = `${month}/${year}`
		}

		const isValid = isValidMonth(month) && isValidYear(year)

		setValue(field, value)

		if (isValid) {
			if (errors.billingDate?.[index]) {
				clearErrors(field)
			}
		} else invalidate()
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

			<Divider mb={3} mt={3} />

			{fields.map((field, index) => {
				return (
					<FormControl
						key={field.id}
						isInvalid={!!errors.billingDate?.[index]}
						mt={5}
						isRequired
					>
						<InputLabel htmlFor={`billingDate.${index}`}>
							Competência{fields.length > 1 ? ` ${index + 1}` : ""}
						</InputLabel>
						<Input
							type="text"
							placeholder="MM/AAAA"
							maxLength={7}
							{...register(`billingDate.${index}`)}
							onChange={(e) => onChangeBillingDate(e, index)}
						/>

						<FormErrorMessage>
							{errors.billingDate?.[index] &&
								errors.billingDate?.[index]?.message}
						</FormErrorMessage>
					</FormControl>
				)
			})}

			<Flex gap={3} mt={4}>
				<Button
					colorScheme="green"
					type="button"
					title="Clique para adicionar mais um mês de competência para este lançamento"
					size="xs"
					isLoading={isSubmitting}
					isDisabled={isSubmitting}
					rightIcon={<PlusCircle />}
					onClick={() => append(defaultValues?.billingDate)}
				>
					Adicionar competência
				</Button>

				{fields.length > 1 && (
					<Button
						colorScheme="red"
						type="button"
						title="Clique para remover a última competência adicionada"
						size="xs"
						isLoading={isSubmitting}
						isDisabled={isSubmitting}
						rightIcon={<MinusCircle />}
						onClick={() => remove(fields.length - 1)}
					>
						Remover competência
					</Button>
				)}
			</Flex>

			<Divider mb={3} mt={3} />

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
