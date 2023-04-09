import { Api } from "~/services"
import {
	ServerResponse,
	CreateTenantResponse,
	CreateTenantPayload,
} from "~/interfaces"
import { handleError } from "~/utils"

export const createTenant = async ({
	name,
	responsible,
	isActive,
}: CreateTenantPayload): Promise<ServerResponse<CreateTenantResponse>> => {
	try {
		const { data } = await Api.post<CreateTenantResponse>("/tenants", {
			name,
			responsible,
			isActive,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
