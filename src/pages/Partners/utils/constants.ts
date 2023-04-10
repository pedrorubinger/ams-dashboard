import {
	PartnerFinancialSupportLabel as Label,
	PartnerFinancialSupportType as Value,
	SearchPartnerType,
	TableColumn,
} from "~/interfaces"

interface ContributionOption {
	label: Label
	value: Value
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

export const searchOptions: SearchTypeOption[] = [
	{ label: "Matrícula", value: "id" },
	{ label: "Nome", value: "name" },
]

export const contributioOptions: ContributionOption[] = [
	{ label: Label.COPASA, value: Value.COPASA },
	{ label: Label.PIX, value: Value.PIX },
	{ label: Label.TICKET, value: Value.TICKET },
]
