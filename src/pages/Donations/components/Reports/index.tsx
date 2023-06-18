import React, { useContext } from "react"
import { Flex, Text } from "@chakra-ui/react"

import { DonationCategory } from "~/interfaces"
import { DonationContext, PartnerContext } from "~/contexts"
import { ReportsSection } from "~/pages/Donations/components/Reports/styles"
import {
	CategoryDonationsReport,
	IncomeDateDonationsReports,
	PartnerReports,
	ReportCardsSkeleton,
} from "~/pages/Donations/components"

interface Props {
	hasFilter: boolean
	isLoading: boolean
	activeFilter: string[] | undefined
}

const CATEGORIES = [
	DonationCategory.COPASA,
	DonationCategory.PIX,
	DonationCategory.TICKET,
]

export const DonationsReport: React.FC<Props> = ({
	activeFilter,
	hasFilter,
	isLoading,
}) => {
	const { error: donationsError } = useContext(DonationContext)
	const { error: partnersError } = useContext(PartnerContext)

	if (donationsError && partnersError) {
		return (
			<Flex mt={7} justifyContent="center">
				<Text
					fontWeight="bold"
					color="blackAlpha.600"
					textAlign="center"
					fontSize={18}
				>
					Desculpe, não foi possível gerar os seus relatórios neste momento. Por
					favor, tente novamente mais tarde.
				</Text>
			</Flex>
		)
	}

	return (
		<>
			<Flex>
				{!!isLoading && <ReportCardsSkeleton hasFilter={false} />}
				{!isLoading && <PartnerReports />}
			</Flex>

			<Flex>
				{!!isLoading && <ReportCardsSkeleton hasFilter={hasFilter} />}
				{!isLoading && (
					<IncomeDateDonationsReports
						hasFilter={hasFilter}
						dateRange={activeFilter}
					/>
				)}
			</Flex>

			{CATEGORIES.map((category) => {
				return (
					<Flex key={category}>
						{!!isLoading && <ReportCardsSkeleton hasFilter={hasFilter} />}
						{!isLoading && (
							<CategoryDonationsReport
								hasFilter={hasFilter}
								dateRange={activeFilter}
								category={category}
							/>
						)}
					</Flex>
				)
			})}
		</>
	)
}

export { ReportsSection }
