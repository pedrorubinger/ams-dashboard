import { Api } from "~/services"
import {
	ServerResponse,
	CreatePartnerPayload,
	CreatePartnerResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const createPartner = async ({
	registrationId,
	name,
}: CreatePartnerPayload): Promise<ServerResponse<CreatePartnerResponse>> => {
	try {
		const { data } = await Api.post<CreatePartnerResponse>("/partners", {
			registrationId,
			name,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
