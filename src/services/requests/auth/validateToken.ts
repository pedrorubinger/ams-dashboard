import { Api } from "~/services"
import { ValidateTokenResponse, ServerResponse } from "~/interfaces"
import { handleError } from "~/utils"

export const validateToken = async (): Promise<
	ServerResponse<ValidateTokenResponse>
> => {
	try {
		const { data } = await Api.get<ValidateTokenResponse>("/sessions/validate")

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
