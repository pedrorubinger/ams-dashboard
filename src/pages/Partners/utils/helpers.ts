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
}

export const getGroupedValues = (
	records: Donation[]
): GetGroupedValuesResponse => {
	const currentYear: number = new Date().getFullYear()

	const totalSum: number = records.reduce((prev, curr) => prev + curr.value, 0)

	const monthlySum: DonationPerMonth[] = new Array(12)
		.fill(undefined)
		.map((_: undefined, i: number) => {
			const month = (i + 1) as DonationBillingMonth
			const recordsPerMonth = records.filter((record) => {
				const recordMonth = Number(String(record?.billingDate).split("/")?.[0])
				const recordYear = Number(String(record?.billingDate).split("/")?.[1])

				return recordMonth === month && recordYear === currentYear
			})
			const status = recordsPerMonth.length
				? DonationBillingMonthStatus.DONE
				: DonationBillingMonthStatus.PENDING

			return {
				billingLabel: `${String(month).padStart(2, "0")}/${currentYear}`,
				value: recordsPerMonth.reduce((prev, curr) => prev + curr.value, 0),
				month,
				status,
			}
		})

	const annualySum = monthlySum.reduce((prev, curr) => prev + curr.value, 0)

	return { annualySum, monthlySum, totalSum }
}
