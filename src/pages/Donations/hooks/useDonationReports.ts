import { useContext, useMemo } from "react"

import { DonationContext } from "~/contexts"
import { DonationCategory, DonationReportDateMode } from "~/interfaces"
import {
	getAnnuallyDonationsSum,
	getDailyDonationsSum,
	getDonationsSumByRange,
	getMonthlyDonationsSum,
} from "~/utils"

interface Params {
	date: {
		month: number
		today: number
		year: number
	}
	mode: DonationReportDateMode
	range?: string[]
	category?: DonationCategory
}

interface Response {
	dailySum: number
	annuallySum: number
	monthlySum: number
	rangeSum: number
}

export const useDonationReports = ({
	date,
	mode,
	range,
	category,
}: Params): Response => {
	const { month, today, year } = date
	const { records } = useContext(DonationContext)
	const dailySum = useMemo(
		() => getDailyDonationsSum({ records, target: today, mode, category }),
		[records, today]
	)
	const monthlySum = useMemo(
		() => getMonthlyDonationsSum({ records, target: month, mode, category }),
		[records, month]
	)
	const annuallySum = useMemo(
		() => getAnnuallyDonationsSum({ records, target: year, mode, category }),
		[records, year]
	)
	const rangeSum = useMemo(
		() => getDonationsSumByRange({ records, range, mode, category }),
		[records, range, mode]
	)

	return { dailySum, annuallySum, monthlySum, rangeSum }
}
