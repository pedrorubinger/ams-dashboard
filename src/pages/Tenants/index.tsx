import { useCallback, useEffect, useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { ArrowClockwise, PlusCircle } from "phosphor-react"

import {
	GetTenantsParams,
	Pagination,
	TableActionMenuItem,
	Tenant,
	TenantsDrawerProps,
} from "~/interfaces"
import { getTenants } from "~/services"
import { TenantsTable, TenantsDrawer } from "~/pages/Tenants/components"
import { DefaultAlert, PageTitle } from "~/components"

export const Tenants: React.FC = () => {
	const [isFetching, setIsFetching] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>("")
	const [records, setRecords] = useState<Tenant[]>([])
	const [pagination, setPagination] = useState<Pagination | null>(null)
	const [drawerProps, setDrawerProps] = useState<Omit<
		TenantsDrawerProps,
		"onClose"
	> | null>(null)
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

	const actionItems: TableActionMenuItem[] = [
		{
			id: "register",
			label: "Nova instituição",
			title: "Clique para cadastrar uma nova instituição",
			Icon: <PlusCircle />,
			onClick: () =>
				setDrawerProps({ isVisible: true, mode: "create", fetchRecords }),
		},
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de instituições",
			Icon: <ArrowClockwise />,
			onClick: () => void fetchRecords(),
		},
	]

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
			/>

			{!!drawerProps && (
				<TenantsDrawer
					isVisible={drawerProps.isVisible}
					mode={drawerProps.mode}
					onClose={() => setDrawerProps(null)}
					fetchRecords={fetchRecords}
				/>
			)}

			{!errorMessage && (
				<TenantsTable
					actionItems={actionItems}
					isLoading={isLoading}
					records={records}
					pagination={pagination}
					fetchRecords={fetchRecords}
				/>
			)}
		</Box>
	)
}
