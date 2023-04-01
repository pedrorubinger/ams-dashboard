import { useCallback, useEffect, useState } from "react"
import { Box, Text } from "@chakra-ui/react"

import { GetTenantsParams, Pagination, Tenant } from "~/interfaces"
import { getTenants } from "~/services"
import { TenantsTable } from "~/pages/Tenants/components"
import { DefaultAlert, PageTitle } from "~/components"

export const Tenants: React.FC = () => {
	const [isFetching, setIsFetching] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>("")
	const [records, setRecords] = useState<Tenant[]>([])
	const [pagination, setPagination] = useState<Pagination | null>(null)
	const isLoading = !isMounted || isFetching

	const fetchRecords = useCallback(async (params?: GetTenantsParams) => {
		setIsFetching(true)

		const { data, error } = await getTenants(params)

		setIsFetching(false)

		if (error) return setErrorMessage(error)

		if (data) {
			setPagination({
				total: data?.total || data.tenants.length,
				lastKey: data.lastKey,
			})
			return setRecords((prev) =>
				params?.startAt ? [...prev, ...data.tenants] : data.tenants
			)
		}
	}, [])

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	useEffect(() => {
		void fetchRecords()
	}, [fetchRecords])

	return (
		<Box width="100%">
			<PageTitle>Instituições</PageTitle>

			<Text>
				Nesta página você encontra as informações das instituições atualmente
				cadastradas no sistema.
			</Text>

			<DefaultAlert
				status="error"
				mt={8}
				isVisible={!!errorMessage}
				message={errorMessage}
				onClose={() => setErrorMessage("")}
			/>

			{!errorMessage && (
				<TenantsTable
					isLoading={isLoading}
					records={records}
					pagination={pagination}
					fetchRecords={fetchRecords}
				/>
			)}
		</Box>
	)
}
