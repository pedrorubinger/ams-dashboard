import { Partner } from "~/interfaces"

type PartnerDrawerMode = "create" | "update"

export interface PartnerDrawerProps {
	isVisible: boolean
	mode: PartnerDrawerMode
	partner?: Partner
	onClose: () => void
}
