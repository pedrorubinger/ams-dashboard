import React, { useState } from "react"
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Text,
} from "@chakra-ui/react"

import {
	PartnerDonationListDrawerProps as Props,
	PartnerDonation,
	PartnerDonationBillingMonth,
	PartnerDonationCategory,
} from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { priceFormatter } from "~/utils"
import { getGroupedValues } from "~/pages/Partners/utils"
import {
	PartnerDonationListTable,
	PartnerDonationPerMonthListTable,
} from "~/pages/Partners/components"
import { DefaultAlert, Tooltip } from "~/components"

export const PartnerDonationListDrawer: React.FC<Props> = ({
	isVisible,
	partner,
	onClose,
}) => {
	const initialValues: PartnerDonation[] = [
		{
			id: "1",
			billingMonth: [PartnerDonationBillingMonth.APR],
			billingYear: 2023,
			category: PartnerDonationCategory.PIX,
			createdAt: new Date("2023-04-16"),
			updatedAt: new Date("2023-04-16"),
			partnerId: partner.id,
			value: 15000,
		},
		{
			id: "2",
			billingMonth: [PartnerDonationBillingMonth.APR],
			billingYear: 2023,
			category: PartnerDonationCategory.COPASA,
			createdAt: new Date("2023-04-03"),
			updatedAt: new Date("2023-04-03"),
			partnerId: partner.id,
			value: 45000,
		},
		{
			id: "3",
			billingMonth: [PartnerDonationBillingMonth.MAR],
			billingYear: 2023,
			category: PartnerDonationCategory.COPASA,
			createdAt: new Date("2023-03-12"),
			updatedAt: new Date("2023-03-12"),
			partnerId: partner.id,
			value: 32540,
		},
		{
			id: "4",
			billingMonth: [PartnerDonationBillingMonth.JAN],
			billingYear: 2023,
			category: PartnerDonationCategory.TICKET,
			createdAt: new Date("2023-01-11"),
			updatedAt: new Date("2023-01-11"),
			partnerId: partner.id,
			value: 21500,
		},
		{
			id: "5",
			billingMonth: [PartnerDonationBillingMonth.DEC],
			billingYear: 2022,
			category: PartnerDonationCategory.PIX,
			createdAt: new Date("2022-12-14"),
			updatedAt: new Date("2022-12-14"),
			partnerId: partner.id,
			value: 5600,
		},
		{
			id: "6",
			billingMonth: [PartnerDonationBillingMonth.NOV],
			billingYear: 2022,
			category: PartnerDonationCategory.PIX,
			createdAt: new Date("2022-11-14"),
			updatedAt: new Date("2022-11-14"),
			partnerId: partner.id,
			value: 5200,
		},
		{
			id: "7",
			billingMonth: [PartnerDonationBillingMonth.OCT],
			billingYear: 2022,
			category: PartnerDonationCategory.PIX,
			createdAt: new Date("2022-10-03"),
			updatedAt: new Date("2022-10-04"),
			partnerId: partner.id,
			value: 4500,
		},
		{
			id: "8",
			billingMonth: [PartnerDonationBillingMonth.AUG],
			billingYear: 2022,
			category: PartnerDonationCategory.COPASA,
			createdAt: new Date("2022-08-12"),
			updatedAt: new Date("2022-08-12"),
			partnerId: partner.id,
			value: 2300,
		},
		{
			id: "9",
			billingMonth: [PartnerDonationBillingMonth.AUG],
			billingYear: 2022,
			category: PartnerDonationCategory.PIX,
			createdAt: new Date("2022-08-05"),
			updatedAt: new Date("2022-08-05"),
			partnerId: partner.id,
			value: 12000,
		},
		{
			id: "10",
			billingMonth: [PartnerDonationBillingMonth.JUL],
			billingYear: 2022,
			category: PartnerDonationCategory.PIX,
			createdAt: new Date("2023-03-09"),
			updatedAt: new Date("2023-03-09"),
			partnerId: partner.id,
			value: 10000,
		},
	]
	const isMounted = useIsMounted()
	const partnerName: string = partner?.name?.split(" ")?.[0] || "associado"
	const [isFetching, setIsFetching] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [records, setRecords] = useState<PartnerDonation[]>(initialValues)
	const isLoading = /* !isMounted() || */ isFetching
	const { annualySum, monthlySum, totalSum } = getGroupedValues(records)

	const ErrorContent = (
		<DefaultAlert
			status="error"
			mb={5}
			isVisible={!!errorMessage}
			message={errorMessage}
		/>
	)

	const MainContent = (
		<>
			<Text mb="10">
				Nas seções abaixo você encontra todos os lançamentos feitos para este
				associado.
			</Text>

			<Accordion allowToggle>
				<AccordionItem>
					<AccordionButton>
						<Box
							as="span"
							flex="1"
							textAlign="left"
							fontWeight="bold"
							color="blackAlpha.700"
						>
							Ver valores do ano corrente
						</Box>
						<AccordionIcon />
					</AccordionButton>

					<AccordionPanel pb={1}>
						<Flex>
							<Flex alignItems="center">
								<Text>Valor anual</Text>&nbsp;
								<Tooltip label="Corresponde à somatória, separada por meses, de todos os lançamentos feitos para o associado no ano atual." />
							</Flex>
							:&nbsp;<strong>{priceFormatter.format(annualySum / 100)}</strong>
						</Flex>

						<PartnerDonationPerMonthListTable
							records={monthlySum}
							/** TO DO: Implement correct loading prop... */
							isLoading={false}
						/>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<AccordionButton>
						<Box
							as="span"
							flex="1"
							textAlign="left"
							fontWeight="bold"
							color="blackAlpha.700"
						>
							Ver todos os lançamentos
						</Box>
						<AccordionIcon />
					</AccordionButton>

					<AccordionPanel pb={1}>
						<Flex>
							<Flex alignItems="center">
								<Text>Valor total</Text>&nbsp;
								<Tooltip label="Corresponde à somatória de todos os lançamentos feitos para o associado durante todo o período." />
							</Flex>
							:&nbsp;<strong>{priceFormatter.format(totalSum / 100)}</strong>
						</Flex>

						<PartnerDonationListTable records={records} isLoading={false} />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
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
