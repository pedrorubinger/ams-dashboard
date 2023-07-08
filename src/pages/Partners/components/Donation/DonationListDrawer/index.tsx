import React, { useContext, useEffect, useRef } from "react"
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

import { DonationListDrawerProps, ErrorCode } from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { priceFormatter, getBillingMonthDonationGroupedValues } from "~/utils"
import { DonationContext } from "~/contexts"
import {
	DonationListTable,
	DonationPerMonthListTable,
} from "~/pages/Partners/components"
import { DefaultAlert, TablePaginationSkeleton, Tooltip } from "~/components"

export const DonationListDrawer: React.FC<DonationListDrawerProps> = ({
	isVisible,
	partner,
	onClose,
}) => {
	const isMounted = useIsMounted()
	const hasRendered = useRef(true)
	const partnerName: string = partner?.name || "associado"
	const { isFetching, records, error, fetchDonations } =
		useContext(DonationContext)
	const { average, annualySum, monthlySum, totalSum, monthlySumWholePeriod } =
		getBillingMonthDonationGroupedValues(records)
	const haveValuesFromOtherYears: boolean =
		monthlySumWholePeriod.flat().length > 12
	const isLoading = isFetching || !isMounted

	const ErrorContent = (
		<DefaultAlert
			status="error"
			mb={5}
			isVisible={!!error}
			message={error as ErrorCode}
		/>
	)

	const MainContent = (
		<>
			<Text mb="10">
				Nas seções abaixo você encontra todos os lançamentos feitos para este
				associado.
			</Text>

			<Accordion allowToggle>
				{!!haveValuesFromOtherYears && (
					<AccordionItem>
						<AccordionButton>
							<Box
								as="span"
								flex="1"
								textAlign="left"
								fontWeight="bold"
								color="blackAlpha.700"
							>
								Ver valores de todos os anos (por mês)
							</Box>
							<AccordionIcon />
						</AccordionButton>

						<AccordionPanel>
							<Flex>
								<Flex alignItems="center">
									<Text>Valor total</Text>&nbsp;
									<Tooltip label="Corresponde à somatória, separada por meses, de todos os lançamentos já feitos para o associado, contando a partir do ano do primeiro lançamento." />
								</Flex>
								:&nbsp;<strong>{priceFormatter.format(totalSum / 100)}</strong>
							</Flex>

							<DonationPerMonthListTable
								records={monthlySumWholePeriod.flat()}
								isLoading={isLoading}
							/>
						</AccordionPanel>
					</AccordionItem>
				)}

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

						<DonationPerMonthListTable
							records={monthlySum}
							isLoading={isLoading}
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

						<Flex>
							<Flex alignItems="center">
								<Text>Valor médio</Text>&nbsp;
								<Tooltip label="Corresponde à somatória de todos os lançamentos feitos para o associado por mês dividido pela quantidade de meses em que houve contribuição." />
							</Flex>
							:&nbsp;<strong>{priceFormatter.format(average / 100)}</strong>
						</Flex>

						<DonationListTable records={records} isLoading={false} />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</>
	)

	useEffect(() => {
		if (hasRendered.current && partner) {
			hasRendered.current = false

			void fetchDonations({ partnerId: partner.id })
		}
	}, [partner])

	return (
		<Drawer isOpen={isVisible} onClose={onClose} size="xl">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Lançamentos de {partnerName}</DrawerHeader>

				{!!isLoading && (
					<DrawerBody>
						<TablePaginationSkeleton />
						<TablePaginationSkeleton />
					</DrawerBody>
				)}

				{!isLoading && (
					<DrawerBody>{error ? ErrorContent : MainContent}</DrawerBody>
				)}
			</DrawerContent>
		</Drawer>
	)
}
