import { UserFormValues } from "~/interfaces/UserFormValues"

type Values = Omit<UserFormValues, "isCreating" | "password" | "email">

export interface UpdateUserPayload extends Partial<Values> {
	id: string
}
