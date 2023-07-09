import { useDisclosure } from "@chakra-ui/react"
import React, { useContext, useState } from "react"

import { DeleteDonationModalData, PartnerRecord } from "~/interfaces"
import { deleteDonation } from "~/services/requests"
import { DeleteDonationModal } from "~/pages/Partners/components"
import { DonationContext } from "~/contexts"

interface Props {
	partner: PartnerRecord
}

interface DeleteDonationModalResponse {
	Modal: React.FC
	onOpen: (data: DeleteDonationModalData) => void
}

type ModalProps = DeleteDonationModalData | null

export const useDeleteDonationModal = ({
	partner,
}: Props): DeleteDonationModalResponse => {
	const [info, setInfo] = useState<ModalProps>(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure()
	const { fetchDonations } = useContext(DonationContext)

	const onOpenModal = ({ id, value }: DeleteDonationModalData) => {
		setInfo({ id, value })
		onOpen()
	}

	const onCloseModal = () => {
		setIsDeleting(false)
		setErrorMessage("")
		onClose()
	}

	const onDeleteDonation = async (id: string) => {
		setIsDeleting(true)

		const { error } = await deleteDonation({ id })

		setIsDeleting(false)

		if (error) return setErrorMessage(error)

		onCloseModal()
		await fetchDonations({ partnerId: partner.id })
	}

	const Modal: React.FC = () => {
		if (!info) return null

		return (
			<DeleteDonationModal
				data={info}
				errorMessage={errorMessage}
				isDeleting={isDeleting}
				isVisible={isVisible}
				onClose={onCloseModal}
				onConfirm={async () => {
					await onDeleteDonation(info.id)
				}}
			/>
		)
	}

	return { Modal, onOpen: onOpenModal }
}
