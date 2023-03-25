import { Api } from "~/services"
import { ValidateTokenResponse, ServerResponse, User } from "~/interfaces"

export const validateToken = async (): Promise<ServerResponse<ValidateTokenResponse>> => {
	try {
		const { data } = await Api.get<ValidateTokenResponse>("/sessions/validate")

		return { success: true, data }
	} catch (err: any) {
		return { success: false, error: err }
	}
}
