import {
	PartnerFinancialSupportCategoryLabel as CategoryLabel,
	PartnerFinancialSupportCategory as CategoryValue,
	PartnerFinancialSupportBillingMonth as MonthValue,
	PartnerFinancialSupportBillingMonthLabel as MonthLabel,
	SearchPartnerType,
	TableColumn,
} from "~/interfaces"

interface FinancialSupportBillingMonthOption {
	label: MonthLabel
	value: MonthValue
}

interface FinancialSupportCategoryOption {
	label: CategoryLabel
	value: CategoryValue
}

interface SearchTypeOption {
	label: string
	value: SearchPartnerType
}

export const columns: TableColumn[] = [
	{ id: 1, label: "Matrícula" },
	{ id: 2, label: "Nome" },
	{ id: 3, label: "Data de cadastro" },
	{ id: 4, label: "Ações" },
]

export const financialSupportColumns: TableColumn[] = [
	{ id: 1, label: "Categoria" },
	{ id: 2, label: "Competência" },
	{ id: 3, label: "Valor" },
	{ id: 4, label: "Lançado em" },
]

export const searchOptions: SearchTypeOption[] = [
	{ label: "Matrícula", value: "id" },
	{ label: "Nome", value: "name" },
]

export const financialSupportOptions: FinancialSupportCategoryOption[] = [
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

export const financialSupportBillingMonthOptions: FinancialSupportBillingMonthOption[] =
	[
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
