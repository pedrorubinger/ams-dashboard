import React from "react"
import { Flex } from "@chakra-ui/react"

import { ReportsSection } from "~/pages/Donations/components/Reports/styles"
import {
	// BillingMonthDonationsReports,
	IncomeDateDonationsReports,
	ReportCardsSkeleton,
} from "~/pages/Donations/components"

interface Props {
	hasFilter: boolean
	isLoading: boolean
	activeFilter: string[] | undefined
}

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

			{/* <Flex>
				{!!isLoading && <ReportCardsSkeleton hasFilter={hasFilter} />}

				{!isLoading && (
					<BillingMonthDonationsReports
						hasFilter={hasFilter}
						dateRange={activeFilter}
					/>
				)}
			</Flex> */}
		</>
	)
}

export { ReportsSection }
