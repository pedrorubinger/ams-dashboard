import React from "react"
import { Flex } from "@chakra-ui/react"

import { ReportsSection } from "~/pages/Donations/components/Reports/styles"
import {
	CategoryDonationsReport,
	IncomeDateDonationsReports,
	PartnerReports,
	ReportCardsSkeleton,
} from "~/pages/Donations/components"
import { DonationCategory } from "~/interfaces"

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
	return (
		<>
			<Flex>
				{!!isLoading && <ReportCardsSkeleton hasFilter={hasFilter} />}

				{!isLoading && (
					<IncomeDateDonationsReports
						hasFilter={hasFilter}
						dateRange={activeFilter}
					/>
				)}
			</Flex>

			<PartnerReports />

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
