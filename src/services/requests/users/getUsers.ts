import { Api } from "~/services"
import { ServerResponse, GetDataParams, GetUsersResponse } from "~/interfaces"
import { handleError } from "~/utils"

export const getUsers = async (
	params?: GetDataParams
): Promise<ServerResponse<GetUsersResponse>> => {
	try {
		const { data } = await Api.get<GetUsersResponse>("/users", {
			params: { size: params?.size, startAt: params?.startAt },
		})

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
