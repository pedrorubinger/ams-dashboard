import {
	PartnerFinancialSupport,
	PartnerFinancialSupportPerMonth,
} from "~/interfaces"

interface GetGroupedValuesResponse {
	/** value in cents */
	annualySum: number
	monthlySum: PartnerFinancialSupportPerMonth[]
}

export const getGroupedValues = (
	records: PartnerFinancialSupport[]
): GetGroupedValuesResponse => {
	const currentYear = new Date().getFullYear()
	const groupedByMonth: PartnerFinancialSupport[][] = Array.from(
		new Set(records.map((record) => record.billingMonth))
	)
		.map((month) =>
			records.filter(
				(record) =>
					record.billingMonth === month && record.billingYear === currentYear
			)
		)
		.filter((record) => record.length)

	const monthlySum: PartnerFinancialSupportPerMonth[] = groupedByMonth.map(
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

	return { annualySum, monthlySum }
}
