import { useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"

import { DeleteUserModalData, GetUsersParams } from "~/interfaces"
import { deleteUser } from "~/services/requests"
import { DeleteUserModal } from "~/pages/Users/components"

interface Props {
	fetchRecords: (params?: GetUsersParams) => Promise<void>
}

interface DeleteUserModalResponse {
	Modal: React.FC
	onOpen: (data: DeleteUserModalData) => void
}

type ModalProps = DeleteUserModalData | null

export const useDeleteUserModal = ({
	fetchRecords,
}: Props): DeleteUserModalResponse => {
	const [info, setInfo] = useState<ModalProps>(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure()

	const onOpenModal = ({ id, name }: DeleteUserModalData) => {
		setInfo({ id, name })
		onOpen()
	}

	const onCloseModal = () => {
		setIsDeleting(false)
		setErrorMessage("")
		onClose()
	}

	const onDeleteUser = async (id: string) => {
		setIsDeleting(true)

		const { error } = await deleteUser(id)

		setIsDeleting(false)

		if (error) return setErrorMessage(error)

		onCloseModal()
		await fetchRecords()
	}

	const Modal: React.FC = () => {
		if (!info) return null

		return (
			<DeleteUserModal
				data={info}
				errorMessage={errorMessage}
				isDeleting={isDeleting}
				isVisible={isVisible}
				onClose={onCloseModal}
				onConfirm={async () => {
					await onDeleteUser(info.id)
				}}
			/>
		)
	}

	return { Modal, onOpen: onOpenModal }
}
