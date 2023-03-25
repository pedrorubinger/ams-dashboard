// eslint-disable-next-line import/named
import Axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios"

import { getToken } from "~/utils"

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL
export const Api = Axios.create({ baseURL: API_BASE_URL })

Api.interceptors.request.use((config: AxiosRequestConfig) => {
	const headers: unknown = {
		...config.headers,
		Authorization: `Bearer ${getToken() ?? ""}`,
		"Content-Type": "application/json",
	}
	return { ...config, headers: headers as AxiosHeaders }
})

Api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (error?.response) return Promise.reject(error.response)

		return Promise.reject(error)
	}
)
