import { GetDataParams, GetDataResponse } from "~/interfaces/ServerResponse"

export interface Tenant {
	id: string
	name: string
	responsible: string
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

export interface GetTenantsResponse extends GetDataResponse {
	tenants: Tenant[]
}

export interface CreateTenantPayload extends TenantFormValues {}

export interface GetTenantsParams extends GetDataParams {}

export interface DeleteTenantModalData {
	id: string
	name: string
}

export interface DeleteTenantResponse {
	success: boolean
}

export interface CreateTenantResponse {
	tenant: Tenant
}

export interface TenantFormValues {
	responsible: string
	name: string
	isActive?: boolean
}

type TenantsDrawerMode = "create" | "update"

export interface TenantsDrawerProps {
	isVisible: boolean
	mode: TenantsDrawerMode
	tenant?: Tenant
	onClose: () => void
	fetchRecords: (params?: GetTenantsParams) => Promise<void>
}

export interface UpdateTenantPayload extends Partial<TenantFormValues> {
	id: string
}

export interface UpdateTenantResponse {
	tenant: Tenant
}
