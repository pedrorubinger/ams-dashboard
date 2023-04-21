import React from "react"
import { Flex, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

import {
	PartnerDonationBillingMonth as Month,
	PartnerDonationBillingMonthLabel as MonthLabel,
} from "~/interfaces"
import { dateFormatter } from "~/utils"
import { ReportsContainer } from "~/pages/PartnerDonations/styles"
import { ContentSection, PageTitle } from "~/components"
import { Tooltip } from "~/components/Tooltip"

interface Props {}

export const PartnerDonations: React.FC<Props> = () => {
	const date = new Date()
	const today = dateFormatter.format(date)
	const month: string =
		MonthLabel[Month[date.getMonth() + 1] as keyof typeof MonthLabel]
	const year = String(date.getFullYear())

	return (
		<>
			<ContentSection>
				<PageTitle>Contribuições</PageTitle>

				<Text>
					Nesta página você encontra todas as contribuições registradas. Se você
					deseja ver as contribuições de cada associado, acesse a página&nbsp;
					<Link to="/associados" color="primary.400" as={RouterLink}>
						Associados
					</Link>
					.
				</Text>
			</ContentSection>

			<ReportsContainer>
				<ContentSection mt={6}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={18}>
							Diário
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os lançamentos feitos no dia de hoje (${today})`}
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
						R$ 144,55
					</Text>
				</ContentSection>

				<ContentSection mt={6}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={18}>
							Mensal
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os lançamentos feitos no mês corrente (${month})`}
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
						R$ 484,62
					</Text>
				</ContentSection>

				<ContentSection mt={6}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={18}>
							Anual
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os lançamentos feitos no ano corrente (${year})`}
							placement="top-start"
						/>
					</Flex>
					<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
						R$ 9.144,55
					</Text>
				</ContentSection>
			</ReportsContainer>
		</>
	)
}
