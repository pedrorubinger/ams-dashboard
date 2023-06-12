/* eslint-disable import/named */
import { AxiosRequestConfig } from "axios"

import { Api } from "~/services"
import {
	ServerResponse,
	GetDonationsPayload,
	GetDonationsResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const getDonations = async ({
	category,
	partnerId,
}: GetDonationsPayload): Promise<ServerResponse<GetDonationsResponse>> => {
	try {
		const config: AxiosRequestConfig<GetDonationsPayload> = {
			params: {
				category,
				partnerId,
			},
		}
		const { data } = await Api.get<GetDonationsResponse>("/donations", config)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
