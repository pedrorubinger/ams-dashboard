import React, { useContext, useState } from "react"
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useToast,
} from "@chakra-ui/react"

import { PartnerDeletionModalData } from "~/interfaces"
import { deletePartner } from "~/services"
import { TOAST_OPTIONS } from "~/utils"
import { PartnerContext } from "~/contexts"

interface PartnerDeletionModalProps {
	data: PartnerDeletionModalData
	/** @default false */
	isVisible: boolean
	onClose: () => void
}

export const PartnerDeletionModal: React.FC<PartnerDeletionModalProps> = ({
	isVisible = false,
	data,
	onClose,
}) => {
	const { clearRecords, fetchPartners } = useContext(PartnerContext)
	const toast = useToast()
	const [isDeleting, setIsDeleting] = useState(false)
	const { name, id, registrationId } = data

	const closeModal = () => {
		if (isDeleting) return undefined
		return onClose()
	}

	const onConfirm = async () => {
		setIsDeleting(true)

		const { success, error } = await deletePartner({ id })

		setIsDeleting(false)

		if (error) {
			toast({
				...TOAST_OPTIONS,
				description: error,
				status: "error",
				title: "O associado não foi excluído",
			})
			return
		}

		if (success) {
			toast({
				...TOAST_OPTIONS,
				status: "success",
				title: "O associado foi excluído!",
				description: `O associado ${name} foi excluído com sucesso!`,
			})
			clearRecords()
			void fetchPartners({ hasPagination: true })
			closeModal()
		}
	}

	const getMessage = () => {
		if (isDeleting) {
			return (
				<ModalBody my={4}>
					Por favor, aguarde. Estamos excluindo o associado&nbsp;
					<strong>{name}</strong> <Spinner size="xs" ml={1} />
				</ModalBody>
			)
		}

		return (
			<ModalBody>
				Você tem certeza que deseja excluir <em>permanentemente</em> o(a)
				associado(a)&nbsp;
				<strong>{name}</strong> (<strong>{registrationId}</strong>)?
			</ModalBody>
		)
	}

	return (
		<Modal isOpen={isVisible} onClose={closeModal}>
			<ModalOverlay />

			<ModalContent>
				{!isDeleting && (
					<>
						<ModalHeader>Você tem certeza?</ModalHeader>
						<ModalCloseButton />
					</>
				)}

				{getMessage()}

				{!isDeleting && (
					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onClose}>
							Cancelar
						</Button>

						<Button colorScheme="blue" onClick={() => void onConfirm()}>
							Sim, excluir
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	)
}
