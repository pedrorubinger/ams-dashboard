import { createContext, useCallback, useState } from "react"

import {
	ErrorCode,
	GetPartnerParams,
	GetPartnerResponse,
	PartnerRecord,
	PartnerValues,
	SearchPartnerValues,
} from "~/interfaces"
import { getPartner } from "~/services"

type Error = ErrorCode | null
type Data = GetPartnerResponse | null

interface PartnerProviderProps {
	children: React.ReactNode
}

interface PartnerContextType {
	isFetching: boolean
	records: PartnerRecord[]
	error: Error
	findPartner: (values: SearchPartnerValues) => Promise<void>
}

export const PartnerContext = createContext({} as PartnerContextType)

export const PartnerProvider = ({ children }: PartnerProviderProps) => {
	const [isFetching, setIsFetching] = useState(false)
	const [data, setData] = useState<Data>(null)
	const [error, setError] = useState<Error>(null)
	const records = data?.partners || []

	const findPartner = useCallback(async (values: SearchPartnerValues) => {
		setIsFetching(true)

		if (error) setError(null)

		const params: GetPartnerParams = {
			field: values.field,
			content: values.content,
		}
		const response = await getPartner(params)

		setIsFetching(false)

		if (response.error) {
			setError(response.error)
			return
		}

		if (response.data) {
			setData(response.data)
		}
	}, [])

	// const createPartner = async (values: PartnerValues) => {

	// }

	return (
		<PartnerContext.Provider
			value={{ findPartner, error, isFetching, records }}
		>
			{children}
		</PartnerContext.Provider>
	)
}