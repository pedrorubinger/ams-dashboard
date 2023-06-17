import {
	Donation,
	DonationBillingMonth,
	DonationBillingMonthStatus,
	DonationPerMonth,
} from "~/interfaces"

interface GetGroupedValuesResponse {
	/** value in cents */
	annualySum: number
	/** value in cents */
	totalSum: number
	monthlySum: DonationPerMonth[]
	monthlySumWholePeriod: DonationPerMonth[][]
}

const currentYear: number = new Date().getFullYear()

const getDonationsPerMonth = (
	records: Donation[],
	targetYear = currentYear
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

const getDonationsPerMonthWholePeriod = (
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
	const monthlySum = years.map((year) => getDonationsPerMonth(records, year))

	return monthlySum
}

const getDonationsTotalSum = (records: Donation[]) => {
	return records.reduce((prev, curr) => prev + curr.value, 0)
}

const getDonationsAnnuallySum = (monthlySum: DonationPerMonth[]): number => {
	return monthlySum.reduce((prev, curr) => prev + curr.value, 0)
}

const getDonationsMonthlySum = (
	donationsPerMonth: DonationPerMonth[],
	month: DonationBillingMonth
): number => {
	return donationsPerMonth
		.filter((donation) => donation.month === month)
		.reduce((curr, prev) => curr + prev.value, 0)
}

const getDonationGroupedValues = (
	records: Donation[]
): GetGroupedValuesResponse => {
	const totalSum: number = getDonationsTotalSum(records)
	const monthlySumWholePeriod = getDonationsPerMonthWholePeriod(records)
	const monthlySum: DonationPerMonth[] = getDonationsPerMonth(records)
	const annualySum = getDonationsAnnuallySum(monthlySum)

	return { annualySum, monthlySum, totalSum, monthlySumWholePeriod }
}

export {
	getDonationsPerMonth,
	getDonationsPerMonthWholePeriod,
	getDonationsTotalSum,
	getDonationsAnnuallySum,
	getDonationGroupedValues,
	getDonationsMonthlySum,
}
