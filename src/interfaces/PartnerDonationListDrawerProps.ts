import { PartnerRecord } from "~/interfaces/Partner"

export interface PartnerDonationListDrawerProps {
	isVisible: boolean
	partner: PartnerRecord
	onClose: () => void
}
