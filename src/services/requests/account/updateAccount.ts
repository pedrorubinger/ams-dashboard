import { Api } from "~/services"
import {
	UpdateAccountResponse,
	ServerResponse,
	UpdateAccountPayload,
} from "~/interfaces"
import { handleError, setToken } from "~/utils"

export const updateAccount = async (
	payload: UpdateAccountPayload
): Promise<ServerResponse<UpdateAccountResponse>> => {
	try {
		const { data } = await Api.put<UpdateAccountResponse>("/users", payload)

		setToken(data.token)
		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
