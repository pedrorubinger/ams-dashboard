import { PartnerDonation, PartnerDonationPerMonth } from "~/interfaces"

interface GetGroupedValuesResponse {
	/** value in cents */
	annualySum: number
	/** value in cents */
	totalSum: number
	monthlySum: PartnerDonationPerMonth[]
}

export const getGroupedValues = (
	records: PartnerDonation[]
): GetGroupedValuesResponse => {
	const currentYear = new Date().getFullYear()
	const totalSum: number = records.reduce((prev, curr) => prev + curr.value, 0)
	const groupedByMonth: PartnerDonation[][] = Array.from(
		new Set(records.map((record) => record.billingMonth))
	)
		.map((month) =>
			records.filter(
				(record) =>
					record.billingMonth === month && record.billingYear === currentYear
			)
		)
		.filter((record) => record.length)

	const monthlySum: PartnerDonationPerMonth[] = groupedByMonth.map(
		(record) => ({
			month: record[0].billingMonth,
			year: record[0].billingYear,
			value: record.reduce((prev, curr) => prev + curr.value, 0),
		})
	)

	const annualySum: number = monthlySum.reduce(
		(prev, curr) => prev + curr.value,
		0
	)

	return { annualySum, monthlySum, totalSum }
}
