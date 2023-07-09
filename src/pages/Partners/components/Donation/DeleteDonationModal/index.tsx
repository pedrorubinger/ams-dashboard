import React from "react"
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
} from "@chakra-ui/react"

import { DeleteDonationModalData } from "~/interfaces"
import { priceFormatter } from "~/utils"

interface DeleteTenantModalProps {
	data: DeleteDonationModalData
	/** @default false */
	isVisible: boolean
	/** @default false */
	isDeleting: boolean
	errorMessage: string
	onClose: () => void
	onConfirm: (id: string) => Promise<void>
}

export const DeleteDonationModal: React.FC<DeleteTenantModalProps> = ({
	isVisible = false,
	isDeleting = false,
	errorMessage,
	data,
	onClose,
	onConfirm,
}) => {
	const { value, id } = data
	const hasError = !!errorMessage
	const formattedValue = priceFormatter.format(value / 100)

	const onCloseModal = () => {
		if (isDeleting) return undefined
		return onClose()
	}

	const getMessage = () => {
		if (hasError) {
			return (
				<ModalBody mb={4}>
					Não foi possível excluir a contribuição no valor de{" "}
					<strong>{formattedValue}</strong>. {errorMessage}
				</ModalBody>
			)
		}

		if (isDeleting) {
			return (
				<ModalBody mb={4}>
					Por favor, aguarde. Estamos excluindo a contribuição&nbsp;
					<strong>{formattedValue}</strong> <Spinner size="xs" ml={1} />
				</ModalBody>
			)
		}

		return (
			<ModalBody>
				Você tem certeza que deseja excluir permanentemente a contribuição no
				valor de&nbsp;
				<strong>{formattedValue}</strong>?
			</ModalBody>
		)
	}

	return (
		<Modal isOpen={isVisible} onClose={onCloseModal}>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader>
					{hasError ? "Erro ao excluir" : "Você tem certeza?"}
				</ModalHeader>
				{!isDeleting && <ModalCloseButton />}

				{getMessage()}

				{!isDeleting && (
					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onClose}>
							{hasError ? "Fechar" : "Cancelar"}
						</Button>

						{!hasError && (
							<Button colorScheme="blue" onClick={() => void onConfirm(id)}>
								Sim, excluir
							</Button>
						)}
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	)
}
