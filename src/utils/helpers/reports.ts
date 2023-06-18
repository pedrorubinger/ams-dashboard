import {
	Donation,
	DonationCategory,
	DonationReportDateMode,
} from "~/interfaces"

const getPropName = (mode: DonationReportDateMode): keyof Donation => {
	if (mode === "INCOME") return "incomeDate" as keyof Donation
	return "createdAt" as keyof Donation
}

interface DefaultParams {
	records: Donation[]
	target: number
	mode: DonationReportDateMode
	category?: DonationCategory
}

const getMonthlyDonationsSum = ({
	records,
	target,
	mode,
	category,
}: DefaultParams): number => {
	const prop = getPropName(mode)

	return records
		.filter((donation) => {
			const date = new Date(donation[prop] as Date)
			const isDateValid = date.getMonth() + 1 === target

			if (category) {
				return isDateValid && donation.category === DonationCategory[category]
			}

			return isDateValid
		})
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getDailyDonationsSum = ({
	records,
	target,
	mode,
	category,
}: DefaultParams): number => {
	const prop = getPropName(mode)

	return records
		.filter((donation) => {
			const isDateValid = new Date(donation[prop] as Date).getDate() === target

			if (category) {
				return isDateValid && donation.category === DonationCategory[category]
			}

			return isDateValid
		})
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getAnnuallyDonationsSum = ({
	records,
	target,
	mode,
	category,
}: DefaultParams): number => {
	const prop = getPropName(mode)

	return records
		.filter((donation) => {
			const date = new Date(donation[prop] as Date)
			const isDateValid = date.getFullYear() === target

			if (category) {
				return isDateValid && donation.category === DonationCategory[category]
			}

			return isDateValid
		})
		.reduce((curr, prev) => curr + prev.value, 0)
}

interface GetByRangeParams extends Omit<DefaultParams, "target"> {
	range?: string[]
}

const getDonationsSumByRange = ({
	records,
	mode,
	category,
	range,
}: GetByRangeParams): number => {
	if (!range) return 0

	const prop = getPropName(mode)
	const startDate = range[0]
	const endDate = range[1]

	return records
		.filter((donation) => {
			const date = new Date(donation[prop] as Date).toISOString().split("T")[0]
			const isDateValid = date >= startDate && date <= endDate

			if (category) {
				return isDateValid && donation.category === DonationCategory[category]
			}

			return isDateValid
		})
		.reduce((total, { value }) => total + value, 0)
}

export {
	getMonthlyDonationsSum,
	getDailyDonationsSum,
	getAnnuallyDonationsSum,
	getDonationsSumByRange,
}
