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
	totalMonthlySum: DonationPerMonth[][]
}

const currentYear: number = new Date().getFullYear()

const getMonthlySum = (
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

const getMonthlySumWholePeriod = (
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
	const monthlySum = years.map((year) => getMonthlySum(records, year))

	return monthlySum
}

export const getGroupedValues = (
	records: Donation[] = []
): GetGroupedValuesResponse => {
	const totalSum: number = records.reduce((prev, curr) => prev + curr.value, 0)
	const totalMonthlySum = getMonthlySumWholePeriod(records)
	const monthlySum: DonationPerMonth[] = getMonthlySum(records)
	const annualySum = monthlySum.reduce((prev, curr) => prev + curr.value, 0)

	return { annualySum, monthlySum, totalSum, totalMonthlySum }
}
