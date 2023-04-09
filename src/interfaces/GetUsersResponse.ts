import { UserRecord } from "~/interfaces/User"
import { GetDataResponse } from "~/interfaces/GetDataResponse"

export interface GetUsersResponse extends GetDataResponse {
	users: UserRecord[]
}
