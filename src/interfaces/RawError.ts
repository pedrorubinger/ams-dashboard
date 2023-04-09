import { AxiosError } from "axios"

import { ServerErrorResponse } from "~/interfaces/ServerErrorResponse"

export type RawError = AxiosError<ServerErrorResponse> | unknown
