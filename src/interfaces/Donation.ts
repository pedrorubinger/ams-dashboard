import { PartnerRecord } from "~/interfaces/Partner"

export enum DonationCategory {
	PIX = "PIX",
	COPASA = "COPASA",
	TICKET = "TICKET", // Carnê
}

export enum DonationCategoryLabel {
	PIX = "Pix",
	COPASA = "Copasa",
	TICKET = "Carnê",
}

export enum DonationBillingMonth {
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

export enum DonationBillingMonthStatus {
	PENDING = "PENDING",
	DONE = "DONE",
}

export enum DonationBillingMonthStatusLabel {
	PENDING = "Pendente",
	DONE = "Pago",
}

export interface DonationPerMonth {
	month: DonationBillingMonth
	billingLabel: string
	billingMonthAmount: number
	status: DonationBillingMonthStatus
	/** value in cents */
	value: number
}

export enum DonationBillingMonthLabel {
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

export interface DonationBillingMonthOption {
	label: DonationBillingMonthLabel
	value: DonationBillingMonth
}

type DonationDrawerMode = "create"

export interface NewDonationDrawerProps {
	isVisible: boolean
	mode: DonationDrawerMode
	partner: PartnerRecord
	onClose: () => void
	// fetchRecords: (params?: GetUsersParams) => Promise<void>
}

export interface Donation {
	id: string
	partnerId: string
	billingDate: string[]
	category: DonationCategory
	incomeDate: Date
	value: number // in cents
	description?: string
	createdAt: Date
	updatedAt: Date
}

export interface DonationValues
	extends Pick<Donation, "category" | "description" | "incomeDate"> {
	value: string
	billingDate: string[]
}

export interface DonationSearchValues {
	date: string
}

export interface DonationListDrawerProps {
	isVisible: boolean
	partner: PartnerRecord
	onClose: () => void
}

export interface CreateDonationPayload
	extends Omit<Donation, "createdAt" | "updatedAt" | "id"> {}

export interface CreateDonationResponse {
	donation: Donation
}

export interface GetDonationsParams {
	partnerId?: string
	category?: DonationCategory
}

export interface GetDonationsResponse {
	donations: Donation[]
}
