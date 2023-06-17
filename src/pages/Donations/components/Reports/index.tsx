import React from "react"

import { ReportsSection } from "~/pages/Donations/components/Reports/styles"
import { ReportCardsSkeleton } from "~/pages/Donations/components"
import { BillingMonthDonationsReporta } from "~/pages/Donations/components/Reports/BillingMonthDonationReports"

interface Props {
	hasFilter: boolean
	isLoading: boolean
	activeFilter: string | undefined
}

export const DonationsReport: React.FC<Props> = ({
	activeFilter,
	hasFilter,
	isLoading,
}) => {
	return (
		<ReportsSection $hasFilter={hasFilter}>
			{!!isLoading && <ReportCardsSkeleton hasFilter={hasFilter} />}
			{!isLoading && (
				<BillingMonthDonationsReporta
					hasFilter={hasFilter}
					dateRange={activeFilter}
				/>
			)}
		</ReportsSection>
	)
}
