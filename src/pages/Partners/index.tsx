import { useState } from "react"
import { Text } from "@chakra-ui/react"
import { PlusCircle } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
	PartnerDonationListDrawerProps,
	NewPartnerDonationDrawerProps,
	PartnerRecord,
	SearchPartnerValues,
	TableActionMenuItem,
	PartnerDrawerProps,
	FindPartnerField,
} from "~/interfaces"
import {
	PartnersTable,
	SearchPartner,
	SearchPartnersSchema,
	NewPartnerDonationDrawer,
	PartnerDonationListDrawer,
	PartnerDrawer,
} from "~/pages/Partners/components"
import { ContentSection, PageTitle } from "~/components"

type PartnerDrawerType = null | Omit<PartnerDrawerProps, "onClose">
type NewDonationDrawer = null | Omit<NewPartnerDonationDrawerProps, "onClose">
type ListSupportsDrawer = null | Omit<PartnerDonationListDrawerProps, "onClose">

const searchDefaultValues: SearchPartnerValues = {
	field: FindPartnerField.ID,
	content: "",
}

export const Partners: React.FC = () => {
	const form = useForm<SearchPartnerValues>({
		defaultValues: searchDefaultValues,
		resolver: yupResolver(SearchPartnersSchema),
	})

	const [partnerDonationListDrawer, setPartnerDonationListDrawer] =
		useState<ListSupportsDrawer>(null)
	const [newPartnerDonationDrawer, setNewPartnerDonationDrawer] =
		useState<NewDonationDrawer>(null)
	const [partnerDrawer, setPartnerDrawer] = useState<PartnerDrawerType>(null)

	const onClosePartnerDrawer = () => setPartnerDrawer(null)

	const onCloseNewPartnerDonationDrawer = () =>
		setNewPartnerDonationDrawer(null)

	const onClosePartnerDonationListDrawer = () =>
		setPartnerDonationListDrawer(null)

	const onAddNewPartnerDonation = (partner: PartnerRecord) =>
		setNewPartnerDonationDrawer({
			isVisible: true,
			mode: "create",
			partner,
		})

	const onAddNewPartner = () =>
		setPartnerDrawer({ isVisible: true, mode: "create" })

	const onUpdatePartner = (partner: PartnerRecord) =>
		setPartnerDrawer({ mode: "update", isVisible: true, partner })

	const onViewPartnerDonationList = (partner: PartnerRecord) =>
		setPartnerDonationListDrawer({ isVisible: true, partner })

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
					aparece assim que uma busca é feita.
				</Text>

				{!!newPartnerDonationDrawer && (
					<NewPartnerDonationDrawer
						onClose={onCloseNewPartnerDonationDrawer}
						mode={newPartnerDonationDrawer.mode}
						partner={newPartnerDonationDrawer.partner}
						isVisible
					/>
				)}

				{!!partnerDonationListDrawer && (
					<PartnerDonationListDrawer
						partner={partnerDonationListDrawer.partner}
						onClose={onClosePartnerDonationListDrawer}
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

				<PartnersTable
					actionItems={actionItems}
					onViewPartnerDonationList={onViewPartnerDonationList}
					onAddNewPartnerDonation={onAddNewPartnerDonation}
					onUpdatePartner={onUpdatePartner}
				/>
			</ContentSection>
		</>
	)
}
