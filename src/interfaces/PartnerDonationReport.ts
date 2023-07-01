import { PartnerReportRecord } from "~/interfaces/Partner"

type DetailsModalMode = "ARREAR" | "UP-TO-DATE"

export interface PartnerReportDetailsDrawerProps {
	isVisible: boolean
	title: string
	partners: PartnerReportRecord[]
	mode: DetailsModalMode
	onClose: () => void
}

export interface PartnerReportDetailsDrawerFilterProps {
	name?: string
}
