import { AxiosError } from "axios"

import { ServerErrorResponse } from "~/interfaces/ServerErrorResponse"

export type RawError = any | AxiosError<ServerErrorResponse>
