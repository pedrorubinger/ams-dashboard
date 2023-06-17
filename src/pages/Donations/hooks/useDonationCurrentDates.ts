import { dateFormatter } from "~/utils"
import { DonationBillingMonth, DonationBillingMonthLabel } from "~/interfaces"

type MonthKey = keyof typeof DonationBillingMonth

export const useDonationCurrentDates = () => {
	const d = new Date()
	const today = dateFormatter.format(d)
	const month = d.getMonth() + 1
	const monthLabel =
		DonationBillingMonthLabel[DonationBillingMonth[month] as MonthKey]
	const year = String(d.getFullYear())

	return { today, monthLabel, month, year }
}
