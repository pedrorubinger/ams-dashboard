import { Api } from "~/services"
import {
	ServerResponse,
	UpdatePartnerPayload,
	UpdatePartnerResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const updatePartner = async ({
	id,
	registrationId,
	autoRegistration,
	name,
}: UpdatePartnerPayload): Promise<ServerResponse<UpdatePartnerResponse>> => {
	try {
		const { data } = await Api.put<UpdatePartnerResponse>(`/partners/${id}`, {
			registrationId,
			autoRegistration,
			name,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
