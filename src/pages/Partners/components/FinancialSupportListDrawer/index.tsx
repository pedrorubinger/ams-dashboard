import React, { useState } from "react"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Text,
} from "@chakra-ui/react"

import {
	FinancialSupportListDrawerProps as Props,
	PartnerFinancialSupport,
	PartnerFinancialSupportBillingMonth,
	PartnerFinancialSupportCategory,
} from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { DefaultAlert } from "~/components"
import { FinancialSupportListTable } from "../FinancialSupportListTable"

export const FinancialSupportListDrawer: React.FC<Props> = ({
	isVisible,
	partner,
	onClose,
}) => {
	const isMounted = useIsMounted()
	const partnerName: string = partner?.name?.split(" ")?.[0] || "associado"
	const [isFetching, setIsFetching] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const isLoading = /* !isMounted() || */ isFetching

	const ErrorContent = (
		<DefaultAlert
			status="error"
			mb={5}
			isVisible={!!errorMessage}
			message={errorMessage}
		/>
	)

	const records: PartnerFinancialSupport[] = [
		{
			id: "1",
			billingMonth: PartnerFinancialSupportBillingMonth.JAN,
			category: PartnerFinancialSupportCategory.COPASA,
			createdAt: new Date("2023-01-29"),
			updatedAt: new Date("2023-01-30"),
			partnerId: partner.id,
			value: 1500,
		},
		{
			id: "2",
			billingMonth: PartnerFinancialSupportBillingMonth.DEC,
			category: PartnerFinancialSupportCategory.PIX,
			createdAt: new Date("2022-12-14"),
			updatedAt: new Date("2022-12-04"),
			partnerId: partner.id,
			value: 4500,
		},
	]

	const MainContent = (
		<>
			<Text mb="5">
				Na tabela abaixo você encontra todos os lançamentos feitos para este
				associado.
			</Text>

			<FinancialSupportListTable records={records} isLoading={false} />
			{/* Content enters here... */}
		</>
	)

	return (
		<Drawer isOpen={isVisible} onClose={onClose} size="lg">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Lançamentos de {partnerName}</DrawerHeader>

				{/* {!!isLoading && (
					<DrawerBody>
						Carregando...
						// TO DO: Add skeleton loader...
					</DrawerBody>
				)} */}

				{!isLoading && (
					<DrawerBody>{errorMessage ? ErrorContent : MainContent}</DrawerBody>
				)}
			</DrawerContent>
		</Drawer>
	)
}
