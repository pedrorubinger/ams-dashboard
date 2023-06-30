import {
	Donation,
	DonationBillingMonth,
	DonationBillingMonthStatus,
	DonationPerMonth,
} from "~/interfaces"

interface GetGroupedValuesResponse {
	/** value in cents */
	average: number
	/** value in cents */
	annualySum: number
	/** value in cents */
	totalSum: number
	/** value in cents */
	dailySum: number
	monthlySum: DonationPerMonth[]
	monthlySumWholePeriod: DonationPerMonth[][]
}

const getDonationsPerBillingMonth = (
	records: Donation[],
	targetYear = new Date().getFullYear()
): DonationPerMonth[] => {
	return new Array(12).fill(undefined).map((_: undefined, i: number) => {
		const month = (i + 1) as DonationBillingMonth
		const recordsPerMonth = records.filter((record) => {
			const recordMonth = record.billingDate?.find(
				(date) => Number(String(date).split("/")?.[0]) === month
			) as DonationBillingMonth | undefined
			const recordYear = record.billingDate?.find(
				(date) => Number(String(date).split("/")?.[1]) === targetYear
			)

			return recordMonth && recordYear
		})
		const status = recordsPerMonth.length
			? DonationBillingMonthStatus.DONE
			: DonationBillingMonthStatus.PENDING
		const billingMonthAmount = recordsPerMonth.map(
			(record) => record.billingDate.length
		)[0]

		return {
			billingLabel: `${String(month).padStart(2, "0")}/${targetYear}`,
			value: recordsPerMonth.reduce(
				(prev, curr) =>
					prev +
					(curr.billingDate?.length > 1
						? curr.value / curr.billingDate.length
						: curr.value),
				0
			),
			month,
			status,
			billingMonthAmount,
		}
	})
}

const getWholePeriodDonationsPerBillingMonth = (
	records: Donation[]
): DonationPerMonth[][] => {
	const years: number[] = Array.from(
		new Set(
			records
				.map((record) => record.billingDate)
				.flat()
				.map((date) => Number(date.split("/")[1]))
				.sort((a, b) => a - b)
		)
	)
	const monthlySum = years.map((year) =>
		getDonationsPerBillingMonth(records, year)
	)

	return monthlySum
}

const getDonationsTotalSum = (records: Donation[]) => {
	return records.reduce((prev, curr) => prev + curr.value, 0)
}

const getAnuallyDonationsPerBillingMonth = (
	monthlySum: DonationPerMonth[]
): number => {
	return monthlySum.reduce((prev, curr) => prev + curr.value, 0)
}

const getMonthlyBillingMonthDonationsSum = (
	donationsPerMonth: DonationPerMonth[],
	month: DonationBillingMonth
): number => {
	return donationsPerMonth
		.filter((donation) => donation.month === month)
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getDailyBillingMonthDonationsSum = (
	records: Donation[],
	day: number
): number => {
	return records
		.filter((donation) => new Date(donation.createdAt).getDate() === day)
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getPartnerAverageDonation = (records: Donation[]) => {
	const monthlySum: DonationPerMonth[] = getDonationsPerBillingMonth(records)
	const monthsWithValue = monthlySum.filter((month) => month.value)

	return (
		(monthsWithValue.reduce((prev, curr) => prev + curr.value, 0) || 0) /
			monthsWithValue.length || 0
	)
}

const getBillingMonthDonationGroupedValues = (
	records: Donation[]
): GetGroupedValuesResponse => {
	const totalSum: number = getDonationsTotalSum(records)
	const monthlySumWholePeriod = getWholePeriodDonationsPerBillingMonth(records)
	const monthlySum: DonationPerMonth[] = getDonationsPerBillingMonth(records)
	const annualySum = getAnuallyDonationsPerBillingMonth(monthlySum)
	const dailySum = getDailyBillingMonthDonationsSum(
		records,
		new Date().getDate()
	)
	const average = getPartnerAverageDonation(records)

	return {
		annualySum,
		average,
		dailySum,
		monthlySum,
		monthlySumWholePeriod,
		totalSum,
	}
}

export {
	getDonationsPerBillingMonth,
	getWholePeriodDonationsPerBillingMonth,
	getAnuallyDonationsPerBillingMonth,
	getMonthlyBillingMonthDonationsSum,
	getDailyBillingMonthDonationsSum,
	getDonationsTotalSum,
	getBillingMonthDonationGroupedValues,
	getPartnerAverageDonation,
}
