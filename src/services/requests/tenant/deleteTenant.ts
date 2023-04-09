import { Api } from "~/services"
import { ServerResponse, DeleteTenantResponse } from "~/interfaces"
import { handleError } from "~/utils"

export const deleteTenant = async (
	id: string
): Promise<ServerResponse<DeleteTenantResponse>> => {
	try {
		const { data } = await Api.delete<DeleteTenantResponse>(`/tenants/${id}`)

		return { success: true, data }
	} catch (err) {
		return { success: false, error: handleError(err) }
	}
}
