import { Api } from "~/services"
import {
	ServerResponse,
	GetPartnersResponse,
	GetPartnersApiParams,
} from "~/interfaces"
import { handleError } from "~/utils"

export const getPartners = async (
	params?: GetPartnersApiParams
): Promise<ServerResponse<GetPartnersResponse>> => {
	try {
		const { data } = await Api.get<GetPartnersResponse>("/partners/all", {
			params,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
