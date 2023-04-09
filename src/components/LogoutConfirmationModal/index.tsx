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
} from "@chakra-ui/react"

import { logout } from "~/utils"

interface Props {
	/** @default false */
	isVisible?: boolean
	onClose: () => void
}

export const LogoutConfirmationModal: React.FC<Props> = ({
	isVisible = false,
	onClose,
}) => {
	return (
		<Modal isOpen={isVisible} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Você tem certeza?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					Você tem certeza que deseja encerrar a sessão atual e sair do sistema?
				</ModalBody>

				<ModalFooter>
					<Button
						title="Clique para fechar este modal e continuar logado no sistema"
						colorScheme="ghost"
						color="black"
						mr={3}
						onClick={onClose}
					>
						Cancelar
					</Button>
					<Button
						colorScheme="primary"
						title="Clique para fechar encerrar sua sessão atual e sair do sistema com segurança"
						onClick={logout}
					>
						Sim, desejo sair
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

LogoutConfirmationModal.defaultProps = {
	isVisible: false,
}
