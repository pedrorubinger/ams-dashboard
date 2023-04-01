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
}: CreateTenantPayload): Promise<ServerResponse<CreateTenantResponse>> => {
	try {
		const { data } = await Api.post<CreateTenantResponse>("/tenants", {
			name,
			responsible,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
