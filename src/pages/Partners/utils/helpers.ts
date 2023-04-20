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
	const annualySum: number = records.reduce(
		(prev, curr) => prev + curr.value,
		0
	)
	const groupedByMonth = Array.from(
		new Set(records.map((record) => record.billingMonth))
	).map((month) => records.filter((record) => record.billingMonth === month))
	const monthlySum = groupedByMonth.map((record) => ({
		month: record[0].billingMonth,
		year: record[0].billingYear,
		value: record.reduce((prev, curr) => prev + curr.value, 0),
	}))

	return { annualySum, monthlySum }
}
