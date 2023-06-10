import { PartnerRecord } from "~/interfaces/Partner"

export interface DonationListDrawerProps {
	isVisible: boolean
	partner: PartnerRecord
	onClose: () => void
}
