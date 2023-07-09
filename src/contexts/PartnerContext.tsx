import { createContext, useCallback, useState } from "react"

import {
	ErrorCode,
	GetPartnerParams,
	GetPartnerResponse,
	GetPartnersParams,
	Pagination,
	Partner,
	PartnerRecord,
	SearchPartnerValues,
} from "~/interfaces"
import { getPartner, getPartners } from "~/services"

type Error = ErrorCode | null
type Data = GetPartnerResponse | null

interface PartnerProviderProps {
	children: React.ReactNode
}

interface PartnerContextType {
	isFetching: boolean
	records: PartnerRecord[]
	error: Error
	pagination: Pagination | null
	findPartner: (values: SearchPartnerValues) => Promise<void>
	fetchPartners: (values?: GetPartnersParams) => Promise<void>
	clearRecords: () => void
}

export const PartnerContext = createContext({} as PartnerContextType)

const DEFAULT_SIZE = 100

export const PartnerProvider = ({ children }: PartnerProviderProps) => {
	const [isFetching, setIsFetching] = useState(false)
	const [pagination, setPagination] = useState<Pagination | null>(null)
	const [data, setData] = useState<Data>(null)
	const [error, setError] = useState<Error>(null)
	const records = data?.partners
		? data.partners.sort((a, b) => a.name.localeCompare(b.name))
		: []

	const findPartner = useCallback(async (values: SearchPartnerValues) => {
		setIsFetching(true)
		setError(null)

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

		if (response.data) setData(response.data)
	}, [])

	const fetchPartners = useCallback(async (params?: GetPartnersParams) => {
		setIsFetching(true)
		setError(null)

		const response = await getPartners({
			size: params?.hasPagination ? params?.size || DEFAULT_SIZE : undefined,
			startAt: params?.startAt,
		})

		setIsFetching(false)

		if (response.error) {
			setError(response.error)
			return
		}

		if (response.data) {
			setPagination({
				total: response.data.total || response.data.partners.length,
				lastKey: response.data.lastKey,
			})

			if (response.data) {
				setData((prev) => {
					let result: Partner[] = []

					if (params?.hasPagination) {
						if (prev?.partners.length) {
							result = [...prev.partners]
						}

						if (response?.data?.partners.length) {
							result = [...result, ...response.data.partners]
						}
					} else if (response?.data) {
						result = [...response.data.partners]
					}

					return { partners: result }
				})
			}
		}
	}, [])

	const clearRecords = () => setData(null)

	return (
		<PartnerContext.Provider
			value={{
				fetchPartners,
				findPartner,
				clearRecords,
				pagination,
				error,
				isFetching,
				records,
			}}
		>
			{children}
		</PartnerContext.Provider>
	)
}
