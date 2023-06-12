import { Api } from "~/services"
import {
	ServerResponse,
	GetPartnerResponse,
	GetPartnerParams,
} from "~/interfaces"
import { handleError } from "~/utils"

export const getPartner = async ({
	field,
	content,
}: GetPartnerParams): Promise<ServerResponse<GetPartnerResponse>> => {
	try {
		const { data } = await Api.get<GetPartnerResponse>("/partners", {
			params: { field, content },
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
