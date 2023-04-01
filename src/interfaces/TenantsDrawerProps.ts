import { GetTenantsParams, Tenant } from "~/interfaces"

type TenantsDrawerMode = "create" | "update"

export interface TenantsDrawerProps {
	isVisible: boolean
	mode: TenantsDrawerMode
	tenant?: Tenant
	onClose: () => void
	fetchRecords: (params?: GetTenantsParams) => Promise<void>
}
