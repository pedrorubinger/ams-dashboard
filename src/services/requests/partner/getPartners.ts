import { Api } from "~/services"
import { ServerResponse, GetPartnersResponse } from "~/interfaces"
import { handleError } from "~/utils"

export const getPartners = async (): Promise<
	ServerResponse<GetPartnersResponse>
> => {
	try {
		const { data } = await Api.get<GetPartnersResponse>("/partners/all")

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
