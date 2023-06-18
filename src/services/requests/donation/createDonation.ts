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
	incomeDate,
}: CreateDonationPayload): Promise<ServerResponse<CreateDonationResponse>> => {
	try {
		const { data } = await Api.post<CreateDonationResponse>("/donations", {
			incomeDate,
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
