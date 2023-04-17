import { PartnerRecord } from "~/interfaces/Partner"

export interface FinancialSupportListDrawerProps {
	isVisible: boolean
	partner: PartnerRecord
	onClose: () => void
}
