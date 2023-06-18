import { Donation, DonationReportDateMode } from "~/interfaces"

const getPropName = (mode: DonationReportDateMode): keyof Donation => {
	if (mode === "INCOME") return "incomeDate" as keyof Donation
	return "createdAt" as keyof Donation
}

interface DefaultParams {
	records: Donation[]
	target: number
	mode: DonationReportDateMode
}

const getMonthlyDonationsSum = ({
	records,
	target,
	mode,
}: DefaultParams): number => {
	const prop = getPropName(mode)

	return records
		.filter(
			(donation) => new Date(donation[prop] as Date).getMonth() + 1 === target
		)
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getDailyDonationsSum = ({
	records,
	target,
	mode,
}: DefaultParams): number => {
	const prop = getPropName(mode)

	return records
		.filter((donation) => {
			return new Date(donation[prop] as Date).getDate() === target
		})
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getAnnuallyDonationsSum = ({
	records,
	target,
	mode,
}: DefaultParams): number => {
	const prop = getPropName(mode)

	return records
		.filter(
			(donation) => new Date(donation[prop] as Date).getFullYear() === target
		)
		.reduce((curr, prev) => curr + prev.value, 0)
}

interface GetByRangeParams extends Omit<DefaultParams, "target"> {
	range?: string[]
}

const getDonationsSumByRange = ({
	records,
	mode,
	range,
}: GetByRangeParams): number => {
	if (!range) return 0

	const prop = getPropName(mode)
	const startDate = range[0]
	const endDate = range[1]

	return records
		.filter((donation) => {
			const date = new Date(donation[prop] as Date).toISOString().split("T")[0]

			return date >= startDate && date <= endDate
		})
		.reduce((total, { value }) => total + value, 0)
}

export {
	getMonthlyDonationsSum,
	getDailyDonationsSum,
	getAnnuallyDonationsSum,
	getDonationsSumByRange,
}
