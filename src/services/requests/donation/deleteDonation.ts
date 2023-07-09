import { Api } from "~/services"
import {
	ServerResponse,
	DeleteDonationPayload,
	DeleteDonationResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const deleteDonation = async ({
	id,
}: DeleteDonationPayload): Promise<ServerResponse<DeleteDonationResponse>> => {
	try {
		const { data } = await Api.delete<DeleteDonationResponse>(
			`/donations/${id}`
		)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
