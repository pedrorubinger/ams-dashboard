import { Api } from "~/services"
import {
	ServerResponse,
	UpdateUserResponse,
	UpdateUserPayload,
} from "~/interfaces"
import { handleError } from "~/utils"

export const updateUser = async ({
	id,
	name,
	tenantId,
}: UpdateUserPayload): Promise<ServerResponse<UpdateUserResponse>> => {
	try {
		const payload = { name, tenantId }
		const { data } = await Api.put<UpdateUserResponse>(`/users/${id}`, payload)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
