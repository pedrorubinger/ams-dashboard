import { Api } from "~/services"
import {
	DeletePartnerPayload,
	DeletePartnerResponse,
	ServerResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const deletePartner = async ({
	id,
}: DeletePartnerPayload): Promise<ServerResponse<DeletePartnerResponse>> => {
	try {
		const { data } = await Api.delete<DeletePartnerResponse>(`/partners/${id}`)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
