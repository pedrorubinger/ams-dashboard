import { PartnerRecord } from "~/interfaces/Partner"

export enum PartnerFinancialSupportCategory {
	PIX = "PIX",
	COPASA = "COPASA",
	TICKET = "TICKET", // Carnê
}

export enum PartnerFinancialSupportCategoryLabel {
	PIX = "Pix",
	COPASA = "Copasa",
	TICKET = "Carnê",
}

export enum PartnerFinancialSupportBillingMonth {
	JAN = 1,
	FEB = 2,
	MAR = 3,
	APR = 4,
	MAY = 5,
	JUN = 6,
	JUL = 7,
	AUG = 8,
	SEP = 9,
	OCT = 10,
	NOV = 11,
	DEC = 12,
}

export enum PartnerFinancialSupportBillingMonthLabel {
	JAN = "Janeiro",
	FEB = "Fevereiro",
	MAR = "Março",
	APR = "Abril",
	MAY = "Maio",
	JUN = "Junho",
	JUL = "Julho",
	AUG = "Agosto",
	SEP = "Setembro",
	OCT = "Outubro",
	NOV = "Novembro",
	DEC = "Dezembro",
}

type PartnerFinancialSupportDrawerMode = "create"

export interface NewPartnerFinancialSupportDrawerProps {
	isVisible: boolean
	mode: PartnerFinancialSupportDrawerMode
	partner: PartnerRecord
	onClose: () => void
	// fetchRecords: (params?: GetUsersParams) => Promise<void>
}

export interface PartnerFinancialSupport {
	id: string
	partnerId: string
	billingMonth: string
	category: PartnerFinancialSupportCategory
	value: number // in cents
	description?: string
	createdAt: Date
	updatedAt: Date
}

export interface PartnerFinancialSupportValues
	extends Pick<
		PartnerFinancialSupport,
		"billingMonth" | "category" | "description" | "value"
	> {}
