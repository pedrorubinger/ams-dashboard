import { Tenant } from "~/interfaces/Tenant"

export interface GetTenantsResponse {
	tenants: Tenant[]
	lastKey?: string | null | undefined
	total?: number | null | undefined
}
