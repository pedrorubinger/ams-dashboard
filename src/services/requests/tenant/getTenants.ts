import { Api } from "~/services"
import {
	ServerResponse,
	GetTenantsParams,
	GetTenantsResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const getTenants = async (
	params?: GetTenantsParams
): Promise<ServerResponse<GetTenantsResponse>> => {
	try {
		const { data } = await Api.get<GetTenantsResponse>("/tenants", {
			params: { size: params?.size, startAt: params?.startAt },
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
