import { Api } from "~/services"
import { ServerResponse, DeleteUserResponse } from "~/interfaces"
import { handleError } from "~/utils"

export const deleteUser = async (
	id: string
): Promise<ServerResponse<DeleteUserResponse>> => {
	try {
		const { data } = await Api.delete<DeleteUserResponse>(`/users/${id}`)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
