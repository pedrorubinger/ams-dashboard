import { dateFormatter } from "~/utils"
import { DonationBillingMonth, DonationBillingMonthLabel } from "~/interfaces"

type MonthKey = keyof typeof DonationBillingMonth

export const useDonationCurrentDates = () => {
	const d = new Date()
	const todayLabel = dateFormatter.format(d)
	const today = d.getDate()
	const month = d.getMonth() + 1
	const monthLabel =
		DonationBillingMonthLabel[DonationBillingMonth[month] as MonthKey]
	const year = d.getFullYear()

	return { todayLabel, today, monthLabel, month, year }
}
