import {
	Donation,
	DonationCategory,
	DonationReportDateMode,
	PartnerRecord,
	PartnerReportRecord,
} from "~/interfaces"

interface DefaultDonationParams {
	records: Donation[]
	target: number
	mode: DonationReportDateMode
	category?: DonationCategory
}

interface DefaultPartnerParams {
	partners: PartnerRecord[]
	donations: Donation[]
}

const getPropName = (mode: DonationReportDateMode): keyof Donation => {
	if (mode === "INCOME") return "incomeDate" as keyof Donation
	return "createdAt" as keyof Donation
}

const getMonthlyDonationsSum = ({
	records,
	target,
	mode,
	category,
}: DefaultDonationParams): number => {
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
}: DefaultDonationParams): number => {
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
}: DefaultDonationParams): number => {
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

interface GetByRangeParams extends Omit<DefaultDonationParams, "target"> {
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

const getFirstBillingDate = (dates: string[]) => {
	const customComparator = (first: string, second: string): number => {
		const [month1, year1] = first.split("/")
		const [month2, year2] = second.split("/")

		/* Compare years first */
		if (year1 !== year2) {
			return Number(year1) - Number(year2)
		}

		/* If years are the same, compare months */
		return Number(month1) - Number(month2)
	}

	const sorted = dates.sort(customComparator)

	return sorted[0]
}

const getPassedMonths = (firstDate: string) => {
	const d = new Date()
	const lastDate = `${String(d.getMonth() + 1).padStart(
		2,
		"0"
	)}/${d.getFullYear()}`
	const passed: string[] = []
	let currentDate = firstDate

	while (currentDate !== lastDate) {
		const currentMonth = Number(currentDate.split("/")[0])
		const currentYear = Number(currentDate.split("/")[1])
		const isLastMonth = currentMonth === 12

		currentDate = `${
			isLastMonth ? "01" : String(currentMonth + 1).padStart(2, "0")
		}/${isLastMonth ? currentYear + 1 : currentYear}`

		passed.push(currentDate)
	}

	return passed
}

const getPartnerPayments = ({
	partners,
	donations,
}: DefaultPartnerParams): PartnerReportRecord[] => {
	const records = partners.map((partner) => {
		const partnerDonations = donations.filter(
			(donation) => donation.partnerId === partner.id
		)
		const billingMonths = Array.from(
			new Set(partnerDonations.map((donation) => donation.billingDate).flat())
		)
		const firstBillingDate = getFirstBillingDate(billingMonths)
		const firstMonth = Number(firstBillingDate?.split("/")?.[0])
		const firstYear = Number(firstBillingDate?.split("/")?.[1])

		if (!firstMonth || !firstYear) return false

		const passedMonths: string[] = getPassedMonths(firstBillingDate)

		return {
			...partner,
			arrears: passedMonths.filter((month) => !billingMonths.includes(month)),
		}
	}) as PartnerReportRecord[]

	return records.filter(Boolean)
}

export {
	/* Donation Reports */
	getMonthlyDonationsSum,
	getDailyDonationsSum,
	getAnnuallyDonationsSum,
	getDonationsSumByRange,
	/* Partner Reports */
	getPartnerPayments,
}
