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
	records: Donation[] = []
): GetGroupedValuesResponse => {
	const currentYear: number = new Date().getFullYear()

	const totalSum: number = records.reduce((prev, curr) => prev + curr.value, 0)

	const monthlySum: DonationPerMonth[] = new Array(12)
		.fill(undefined)
		.map((_: undefined, i: number) => {
			const month = (i + 1) as DonationBillingMonth
			const recordsPerMonth = records.filter((record) => {
				const recordMonth = record.billingDate?.find(
					(date) => Number(String(date).split("/")?.[0]) === month
				) as DonationBillingMonth | undefined
				const recordYear = record.billingDate?.find(
					(date) => Number(String(date).split("/")?.[1]) === currentYear
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
				billingLabel: `${String(month).padStart(2, "0")}/${currentYear}`,
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

	const annualySum = monthlySum.reduce((prev, curr) => prev + curr.value, 0)

	return { annualySum, monthlySum, totalSum }
}
