import { PartnerRecord } from "~/interfaces/Partner"

export enum PartnerDonationCategory {
	PIX = "PIX",
	COPASA = "COPASA",
	TICKET = "TICKET", // Carnê
}

export enum PartnerDonationCategoryLabel {
	PIX = "Pix",
	COPASA = "Copasa",
	TICKET = "Carnê",
}

export enum PartnerDonationBillingMonth {
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

export interface PartnerDonationPerMonth {
	month: PartnerDonationBillingMonth
	year: number
	/** value in cents */
	value: number
}

export enum PartnerDonationBillingMonthLabel {
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

type PartnerDonationDrawerMode = "create"

export interface NewPartnerDonationDrawerProps {
	isVisible: boolean
	mode: PartnerDonationDrawerMode
	partner: PartnerRecord
	onClose: () => void
	// fetchRecords: (params?: GetUsersParams) => Promise<void>
}

export interface PartnerDonation {
	id: string
	partnerId: string
	billingMonth: PartnerDonationBillingMonth
	billingYear: number
	category: PartnerDonationCategory
	value: number // in cents
	description?: string
	createdAt: Date
	updatedAt: Date
}

export interface PartnerDonationValues
	extends Pick<
		PartnerDonation,
		"billingMonth" | "billingYear" | "category" | "description" | "value"
	> {}

export interface PartnerDonationSearchValues {
	date: string
}
