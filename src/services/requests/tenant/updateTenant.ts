import { Api } from "~/services"
import {
	ServerResponse,
	UpdateTenantResponse,
	UpdateTenantPayload,
} from "~/interfaces"
import { handleError } from "~/utils"

export const updateTenant = async ({
	id,
	name,
	responsible,
}: UpdateTenantPayload): Promise<ServerResponse<UpdateTenantResponse>> => {
	try {
		const { data } = await Api.put<UpdateTenantResponse>(`/tenants/${id}`, {
			name,
			responsible,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
