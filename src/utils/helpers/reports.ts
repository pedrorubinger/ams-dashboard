/* From here, get values by income dates */

import { Donation, DonationReportDateMode } from "~/interfaces"

const getPropName = (mode: DonationReportDateMode): keyof Donation => {
	if (mode === "INCOME") return "incomeDate" as keyof Donation

	return "createdAt" as keyof Donation
}

const getMonthlyDonationsSum = (
	records: Donation[],
	month: number,
	mode: DonationReportDateMode
): number => {
	const prop = getPropName(mode)

	return records
		.filter(
			(donation) => new Date(donation[prop] as Date).getMonth() + 1 === month
		)
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getDailyDonationsSum = (
	records: Donation[],
	day: number,
	mode: DonationReportDateMode
): number => {
	const prop = getPropName(mode)

	return records
		.filter((donation) => new Date(donation[prop] as Date).getDay() === day)
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getAnnuallyIncomeDateDonationsSum = (
	records: Donation[],
	year: number,
	mode: DonationReportDateMode
): number => {
	const prop = getPropName(mode)

	return records
		.filter(
			(donation) => new Date(donation[prop] as Date).getFullYear() === year
		)
		.reduce((curr, prev) => curr + prev.value, 0)
}

export {
	getMonthlyDonationsSum,
	getDailyDonationsSum,
	getAnnuallyIncomeDateDonationsSum,
}
