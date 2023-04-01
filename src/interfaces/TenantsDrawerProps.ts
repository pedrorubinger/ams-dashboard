import { GetTenantsParams } from "~/interfaces/GetTenantsParams"

type TenantsDrawerMode = "create" | "update"

export interface TenantsDrawerProps {
	isVisible: boolean
	mode: TenantsDrawerMode
	onClose: () => void
	fetchRecords: (params?: GetTenantsParams) => Promise<void>
}
