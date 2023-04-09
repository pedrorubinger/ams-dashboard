import { TenantFormValues } from "~/interfaces/TenantFormValues"

export interface UpdateTenantPayload extends Partial<TenantFormValues> {
	id: string
}
