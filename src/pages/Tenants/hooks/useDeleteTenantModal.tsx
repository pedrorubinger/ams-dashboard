import { useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"

import { DeleteTenantModalData, GetTenantsParams } from "~/interfaces"
import { deleteTenant } from "~/services/requests"
import { DeleteTenantModal } from "~/pages/Tenants/components"

interface Props {
	fetchRecords: (params?: GetTenantsParams) => Promise<void>
}

interface DeleteTenantModalResponse {
	Modal: React.FC
	onOpen: (data: DeleteTenantModalData) => void
}

type ModalProps = DeleteTenantModalData | null

export const useDeleteTenantModal = ({
	fetchRecords,
}: Props): DeleteTenantModalResponse => {
	const [info, setInfo] = useState<ModalProps>(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure()

	const onOpenModal = ({ id, name }: DeleteTenantModalData) => {
		setInfo({ id, name })
		onOpen()
	}

	const onCloseModal = () => {
		setIsDeleting(false)
		setErrorMessage("")
		onClose()
	}

	const onDeleteTenant = async (id: string) => {
		setIsDeleting(true)

		const { error } = await deleteTenant(id)

		setIsDeleting(false)

		if (error) return setErrorMessage(error)

		onCloseModal()
		await fetchRecords()
	}

	const Modal: React.FC = () => {
		if (!info) return null

		return (
			<DeleteTenantModal
				data={info}
				errorMessage={errorMessage}
				isDeleting={isDeleting}
				isVisible={isVisible}
				onClose={onCloseModal}
				onConfirm={async () => {
					await onDeleteTenant(info.id)
				}}
			/>
		)
	}

	return { Modal, onOpen: onOpenModal }
}
