import { Api } from "~/services"
import {
	ServerResponse,
	CreateUserResponse,
	CreateUserPayload,
} from "~/interfaces"
import { handleError } from "~/utils"

export const createUser = async ({
	name,
	email,
	role,
	password,
	tenantId,
	isActive,
}: CreateUserPayload): Promise<ServerResponse<CreateUserResponse>> => {
	try {
		const payload: CreateUserPayload = {
			name,
			email,
			password,
			tenantId,
			role,
			isActive,
		}
		const { data } = await Api.post<CreateUserResponse>("/users", payload)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
