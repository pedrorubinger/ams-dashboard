import { Api } from "~/services"
import { CreateSesssionResponse, ServerResponse, User } from "~/interfaces"
import { setToken } from "~/utils"

type Payload = Pick<User, "email" | "password">

export const createSession = async ({
	email,
	password,
}: Payload): Promise<ServerResponse<CreateSesssionResponse>> => {
	try {
		const payload = { email, password }
		const { data } = await Api.post<CreateSesssionResponse>("/sessions", payload)

		setToken(data.token)
		return { success: true, data }
	} catch (err: any) {
		return { success: false, error: err }
	}
}
