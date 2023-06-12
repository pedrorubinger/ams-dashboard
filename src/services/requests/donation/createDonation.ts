import { Api } from "~/services"
import {
	ServerResponse,
	CreateDonationPayload,
	CreateDonationResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const createDonation = async ({
	billingDate,
	category,
	partnerId,
	value,
	description,
}: CreateDonationPayload): Promise<ServerResponse<CreateDonationResponse>> => {
	try {
		const { data } = await Api.post<CreateDonationResponse>("/donations", {
			billingDate,
			category,
			partnerId,
			value,
			description,
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
