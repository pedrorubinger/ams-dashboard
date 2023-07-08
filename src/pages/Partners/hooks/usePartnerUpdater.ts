/* eslint-disable import/named */
import { useState, useContext } from "react"
import { useToast } from "@chakra-ui/react"
import { UseFormReturn } from "react-hook-form"

import { PartnerContext } from "~/contexts"
import { createPartner, updatePartner } from "~/services"
import {
	CreatePartnerPayload,
	ErrorCode,
	FindPartnerField,
	Partner,
	PartnerDrawerProps,
	PartnerValues,
	UpdatePartnerPayload,
} from "~/interfaces"
import { PARTNER_BAD_REQUEST_ERRORS, TOAST_OPTIONS } from "~/utils"

interface SubmitRes {
	success: boolean
}

interface UsePartnerUpdaterParams extends Pick<PartnerDrawerProps, "mode"> {
	form: UseFormReturn<PartnerValues>
	partner?: Partner | undefined
}

export const usePartnerUpdater = (params: UsePartnerUpdaterParams) => {
	const { mode, form, partner } = params
	const isCreating = mode === "create"
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const toast = useToast()
	const { findPartner } = useContext(PartnerContext)

	const fireSuccessToast = (name: string) => {
		const title = isCreating ? "Associado cadastrado!" : "Dados atualizados!"
		const description = isCreating
			? `O associado ${name} foi cadastrado com sucesso!`
			: `O associado ${name} teve seus dados atualizados com sucesso!`

		toast({
			...TOAST_OPTIONS,
			title,
			description,
			status: "success",
		})
	}

	const handleFormError = (error: ErrorCode | undefined) => {
		const message =
			error || "Desculpe, ocorreu um erro interno. Tente novamente mais tarde."
		const badRequest = PARTNER_BAD_REQUEST_ERRORS.find(
			(item) => item.code === message
		)

		if (badRequest) form.setError(badRequest.field, { type: "custom", message })
		else setErrorMessage(message)
	}

	const create = async (values: CreatePartnerPayload): Promise<SubmitRes> => {
		const { name, registrationId } = values
		const { success, data, error } = await createPartner({
			registrationId,
			name,
		})

		if (error) {
			handleFormError(error)
			return { success: false }
		}

		if (success && data) {
			fireSuccessToast(name)
			void findPartner({
				field: FindPartnerField.ID,
				content: data.partner.registrationId,
			})
			return { success: true }
		}

		return { success: false }
	}

	const update = async (
		values: Omit<UpdatePartnerPayload, "id">
	): Promise<SubmitRes> => {
		if (!partner) return { success: false }

		const { name, registrationId, autoRegistration } = values
		const { success, data, error } = await updatePartner({
			id: partner.id,
			autoRegistration,
			name,
			registrationId,
		})

		if (success && data) {
			fireSuccessToast(partner.name)
			void findPartner({
				field: FindPartnerField.ID,
				content: data.partner.registrationId,
			})
			return { success: true }
		}

		if (error) {
			handleFormError(error)
			return { success: false }
		}

		return { success: false }
	}

	const submit = async ({
		autoRegistrationId,
		name,
		id,
	}: PartnerValues): Promise<SubmitRes> => {
		if (errorMessage) setErrorMessage("")
		setIsSubmitting(true)

		const response = isCreating
			? await create({
					registrationId: autoRegistrationId ? undefined : id,
					name,
			  })
			: await update({
					autoRegistration: autoRegistrationId,
					registrationId: id || undefined,
					name,
			  })

		setIsSubmitting(false)
		return response
	}

	return { isSubmitting, errorMessage, submit }
}
