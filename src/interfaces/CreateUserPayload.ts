import { UserFormValues } from "~/interfaces/UserFormValues"

export interface CreateUserPayload extends Omit<UserFormValues, "isCreating"> {}
