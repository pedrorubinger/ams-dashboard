import { useState } from "react"
import { Text } from "@chakra-ui/react"
import { PlusCircle } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
	DonationListDrawerProps,
	NewDonationDrawerProps,
	PartnerRecord,
	SearchPartnerValues,
	TableActionMenuItem,
	PartnerDrawerProps,
	FindPartnerField,
	PartnerDeletionModalData,
} from "~/interfaces"
import {
	PartnersTable,
	SearchPartner,
	SearchPartnersSchema,
	NewDonationDrawer,
	DonationListDrawer,
	PartnerDrawer,
	PartnerDeletionModal,
} from "~/pages/Partners/components"
import { ContentSection, PageTitle } from "~/components"

type PartnerDrawerType = null | Omit<PartnerDrawerProps, "onClose">
type INewDonationDrawer = null | Omit<NewDonationDrawerProps, "onClose">
type ListSupportsDrawer = null | Omit<DonationListDrawerProps, "onClose">
type PartnerDeletionData = null | PartnerDeletionModalData

const searchDefaultValues: SearchPartnerValues = {
	field: FindPartnerField.ID,
	content: "",
}

export const Partners: React.FC = () => {
	const form = useForm<SearchPartnerValues>({
		defaultValues: searchDefaultValues,
		resolver: yupResolver(SearchPartnersSchema),
	})

	const [partnerDonationListDrawer, setDonationListDrawer] =
		useState<ListSupportsDrawer>(null)
	const [newDonationDrawer, setNewDonationDrawer] =
		useState<INewDonationDrawer>(null)
	const [partnerDrawer, setPartnerDrawer] = useState<PartnerDrawerType>(null)
	const [partnerDeletionData, setPartnerDeletionData] =
		useState<PartnerDeletionData>(null)

	const onClosePartnerDrawer = () => setPartnerDrawer(null)

	const onCloseNewDonationDrawer = () => setNewDonationDrawer(null)

	const onCloseDonationListDrawer = () => setDonationListDrawer(null)

	const onAddNewDonation = (partner: PartnerRecord) =>
		setNewDonationDrawer({
			isVisible: true,
			mode: "create",
			partner,
		})

	const onAddNewPartner = () =>
		setPartnerDrawer({ isVisible: true, mode: "create" })

	const onUpdatePartner = (partner: PartnerRecord) =>
		setPartnerDrawer({ mode: "update", isVisible: true, partner })

	const onViewDonationList = (partner: PartnerRecord) =>
		setDonationListDrawer({ isVisible: true, partner })

	const onDeletePartner = (partner: PartnerRecord) =>
		setPartnerDeletionData(partner)

	const onClosePartnerDeletionModal = () => setPartnerDeletionData(null)

	const actionItems: TableActionMenuItem[] = [
		{
			id: "register",
			label: "Novo associado",
			title: "Clique para cadastrar um novo associado",
			Icon: <PlusCircle />,
			onClick: onAddNewPartner,
		},
	]

	return (
		<>
			<ContentSection>
				<PageTitle>Encontrar associado</PageTitle>

				<Text>
					Para encontrar um associado, selecione o filtro desejado e faça sua
					busca.
				</Text>

				<FormProvider {...form}>
					<SearchPartner />
				</FormProvider>
			</ContentSection>

			<ContentSection mt={6}>
				<PageTitle>Associados</PageTitle>

				<Text>
					Nesta seção você encontra a lista de associados da APAE. A lista
					aparece assim que uma busca é feita. Se nenhum resultado para sua
					busca é encontrado, a lista permanece vazia.
				</Text>

				{!!newDonationDrawer && (
					<NewDonationDrawer
						onClose={onCloseNewDonationDrawer}
						mode={newDonationDrawer.mode}
						partner={newDonationDrawer.partner}
						isVisible
					/>
				)}

				{!!partnerDonationListDrawer && (
					<DonationListDrawer
						partner={partnerDonationListDrawer.partner}
						onClose={onCloseDonationListDrawer}
						isVisible
					/>
				)}

				{!!partnerDrawer && (
					<PartnerDrawer
						mode={partnerDrawer.mode}
						partner={partnerDrawer.partner}
						onClose={onClosePartnerDrawer}
						isVisible
					/>
				)}

				{!!partnerDeletionData && (
					<PartnerDeletionModal
						data={partnerDeletionData}
						onClose={onClosePartnerDeletionModal}
						isVisible
					/>
				)}

				<PartnersTable
					actionItems={actionItems}
					onViewDonationList={onViewDonationList}
					onAddNewDonation={onAddNewDonation}
					onUpdatePartner={onUpdatePartner}
					onDeletePartner={onDeletePartner}
				/>
			</ContentSection>
		</>
	)
}
