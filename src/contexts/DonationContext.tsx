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
	fetchDonations: (values: GetDonationsParams) => Promise<void>
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

		if (error) setError(null)

		const params: GetDonationsParams = {
			category: values?.category,
			partnerId: values?.partnerId,
		}
		const response = await getDonations(params)

		setIsFetching(false)

		if (response.error) {
			setError(response.error)
			return
		}

		if (response.data) {
			setData(response.data)
		}
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
