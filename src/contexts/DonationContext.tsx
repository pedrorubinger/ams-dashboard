import { createContext, useCallback, useState } from "react"

import {
	ErrorCode,
	GetDonationsParams,
	Donation,
	GetDonationsResponse,
} from "~/interfaces"
import { getDonations } from "~/services"

type Error = ErrorCode | null
type Data = GetDonationsResponse | null

interface DonationProviderProps {
	children: React.ReactNode
}

interface DonationContextType {
	isFetching: boolean
	records: Donation[]
	error: Error
	fetchDonations: (values?: GetDonationsParams) => Promise<void>
	clearRecords: () => void
}

export const DonationContext = createContext({} as DonationContextType)

export const DonationProvider = ({ children }: DonationProviderProps) => {
	const [isFetching, setIsFetching] = useState(false)
	const [data, setData] = useState<Data>(null)
	const [error, setError] = useState<Error>(null)
	const records = data?.donations || []

	const fetchDonations = useCallback(async (values?: GetDonationsParams) => {
		setIsFetching(true)
		setError(null)

		const isPaginating = !!values?.size
		const params: GetDonationsParams = {
			category: values?.category,
			partnerId: values?.partnerId,
			size: values?.size,
			startAt: values?.startAt || null,
		}
		const response = await getDonations(params)

		if (response.error) {
			setIsFetching(false)
			setError(response.error)
			return
		}

		if (response.data) {
			if (isPaginating) {
				setData((prev) => {
					const donations = prev?.donations || []
					const resDonations = response?.data?.donations || []

					return { ...prev, donations: [...donations, ...resDonations] }
				})

				if (response?.data.lastKey) {
					await fetchDonations({ ...values, startAt: response.data.lastKey })
					return
				}

				setIsFetching(false)
				return
			}

			setData(response.data)
		}

		setIsFetching(false)
	}, [])

	const clearRecords = () => setData(null)

	return (
		<DonationContext.Provider
			value={{
				fetchDonations,
				clearRecords,
				error,
				isFetching,
				records: records || [],
			}}
		>
			{children}
		</DonationContext.Provider>
	)
}
