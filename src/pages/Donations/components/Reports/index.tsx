import React from "react"
import { Flex, Text } from "@chakra-ui/react"

import {
	DonationBillingMonth as Month,
	DonationBillingMonthLabel as MonthLabel,
} from "~/interfaces"
import { dateFormatter } from "~/utils"
import { ContentSection, Tooltip } from "~/components"

interface Props {
	hasFilter: boolean
	dateRange?: string
}

type MonthKey = keyof typeof MonthLabel

export const DonationsReport: React.FC<Props> = ({ hasFilter, dateRange }) => {
	const d = new Date()
	const today = dateFormatter.format(d)
	const month: string = MonthLabel[Month[d.getMonth() + 1] as MonthKey]
	const year = String(d.getFullYear())

	return (
		<>
			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={15}>
						Diário ({today})
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no dia de hoje (${today})`}
						placement="top-start"
					/>
				</Flex>

				<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
					R$ 144,55
				</Text>
			</ContentSection>

			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={15}>
						Mensal ({month})
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no mês corrente (${month})`}
						placement="top-start"
					/>
				</Flex>

				<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
					R$ 484,62
				</Text>
			</ContentSection>

			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={15}>
						Anual ({year})
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no ano corrente (${year})`}
						placement="top-start"
					/>
				</Flex>
				<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
					R$ 914,55
				</Text>
			</ContentSection>

			{!!hasFilter && (
				<ContentSection mt={6} flexGrow={1}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Período
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os lançamentos feitos no intervalo de datas selecionado${
								dateRange ? ` (${dateRange})` : ""
							}`}
							placement="top-start"
						/>
					</Flex>
					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						R$ 1.431,99
					</Text>
				</ContentSection>
			)}
		</>
	)
}
