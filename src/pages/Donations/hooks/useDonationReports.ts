import { useContext, useMemo } from "react"

import { DonationContext } from "~/contexts"
import { DonationReportDateMode } from "~/interfaces"
import {
	getAnnuallyDonationsSum,
	getDailyDonationsSum,
	getMonthlyDonationsSum,
} from "~/utils"

interface Params {
	date: {
		month: number
		today: number
		year: number
	}
	mode: DonationReportDateMode
}

export const useDonationReports = ({ date, mode }: Params) => {
	const { month, today, year } = date
	const { records } = useContext(DonationContext)
	const dailySum = useMemo(
		() => getDailyDonationsSum(records, today, mode),
		[records, today]
	)
	const monthlySum = useMemo(
		() => getMonthlyDonationsSum(records, month, mode),
		[records, month]
	)
	const annuallySum = useMemo(
		() => getAnnuallyDonationsSum(records, Number(year), mode),
		[records, year]
	)

	return { dailySum, annuallySum, monthlySum }
}
