import {
	DonationCategoryLabel as CategoryLabel,
	DonationCategory as CategoryValue,
	DonationBillingMonth as MonthValue,
	DonationBillingMonthLabel as MonthLabel,
	DonationBillingMonthOption as MonthOption,
	TableColumn,
	DonationValues,
	FindPartnerField,
} from "~/interfaces"

interface DonationCategoryOption {
	label: CategoryLabel
	value: CategoryValue
}

interface SearchTypeOption {
	label: string
	value: FindPartnerField
}

export const columns: TableColumn[] = [
	{ id: 1, label: "Matrícula" },
	{ id: 2, label: "Nome" },
	{ id: 3, label: "Data de cadastro" },
	{ id: 4, label: "Ações" },
]

export const partnerDonationColumns: TableColumn[] = [
	{ id: 1, label: "Categoria" },
	{ id: 2, label: "Competência(s)" },
	{ id: 3, label: "Valor" },
	{ id: 4, label: "Lançado em" },
]

export const partnerDonationPerMonthColumns: TableColumn[] = [
	{ id: 1, label: "Competência" },
	{ id: 2, label: "Total mensal" },
	{ id: 3, label: "Status" },
]

export const searchOptions: SearchTypeOption[] = [
	{ label: "Matrícula", value: FindPartnerField.ID },
	{ label: "Nome", value: FindPartnerField.NAME },
]

export const partnerDonationOptions: DonationCategoryOption[] = [
	{
		label: CategoryLabel.COPASA,
		value: CategoryValue.COPASA,
	},
	{
		label: CategoryLabel.PIX,
		value: CategoryValue.PIX,
	},
	{
		label: CategoryLabel.TICKET,
		value: CategoryValue.TICKET,
	},
]

export const partnerDonationBillingMonthOptions: MonthOption[] = [
	{ label: MonthLabel.JAN, value: MonthValue.JAN },
	{ label: MonthLabel.FEB, value: MonthValue.FEB },
	{ label: MonthLabel.MAR, value: MonthValue.MAR },
	{ label: MonthLabel.APR, value: MonthValue.APR },
	{ label: MonthLabel.MAY, value: MonthValue.MAY },
	{ label: MonthLabel.JUN, value: MonthValue.JUN },
	{ label: MonthLabel.JUL, value: MonthValue.JUL },
	{ label: MonthLabel.AUG, value: MonthValue.AUG },
	{ label: MonthLabel.SEP, value: MonthValue.SEP },
	{ label: MonthLabel.OCT, value: MonthValue.OCT },
	{ label: MonthLabel.NOV, value: MonthValue.NOV },
	{ label: MonthLabel.DEC, value: MonthValue.DEC },
]

const currMonthValue = new Date().getMonth() + 1 // count starts with 0
const currMonth = MonthValue[currMonthValue] as unknown as MonthValue
export const partnerDonationDrawerFormDefaultValues: Partial<DonationValues> = {
	billingDate: [
		`${String(MonthValue[currMonth] as unknown as MonthValue).padStart(
			2,
			"0"
		)}/${new Date().getFullYear()}`,
	],
}
