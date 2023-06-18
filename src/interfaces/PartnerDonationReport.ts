import { PartnerReportRecord } from "~/interfaces/Partner"

type DetailsModalMode = "ARREAR" | "UP-TO-DATE"

export interface PartnerReportDetailsModalProps {
	isVisible: boolean
	title: string
	partners: PartnerReportRecord[]
	mode: DetailsModalMode
	onClose: () => void
}
