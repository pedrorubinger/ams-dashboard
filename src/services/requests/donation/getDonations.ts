/* eslint-disable import/named */
import { AxiosRequestConfig } from "axios"

import { Api } from "~/services"
import {
	ServerResponse,
	GetDonationsParams,
	GetDonationsResponse,
} from "~/interfaces"
import { handleError } from "~/utils"

export const getDonations = async ({
	category,
	partnerId,
	size,
	startAt,
}: GetDonationsParams): Promise<ServerResponse<GetDonationsResponse>> => {
	try {
		const config: AxiosRequestConfig<GetDonationsParams> = {
			params: {
				category,
				partnerId,
				size,
				startAt,
			},
		}
		const { data } = await Api.get<GetDonationsResponse>("/donations", config)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
