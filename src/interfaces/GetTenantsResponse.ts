import { Tenant } from "~/interfaces/Tenant"
import { GetDataResponse } from "~/interfaces/GetDataResponse"

export interface GetTenantsResponse extends GetDataResponse {
	tenants: Tenant[]
}
