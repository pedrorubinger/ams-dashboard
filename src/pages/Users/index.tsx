import { useCallback, useEffect, useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { ArrowClockwise, PlusCircle } from "phosphor-react"

import {
	GetUsersParams,
	Pagination,
	TableActionMenuItem,
	UserRecord,
	UsersDrawerProps,
} from "~/interfaces"
import { getUsers } from "~/services/requests"
import { UsersDrawer, UsersTable } from "~/pages/Users/components"
import { DefaultAlert, PageTitle } from "~/components"

export const Users: React.FC = () => {
	const [drawerProps, setDrawerProps] = useState<Omit<
		UsersDrawerProps,
		"onClose" | "fetchRecords"
	> | null>(null)
	const [isFetching, setIsFetching] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [records, setRecords] = useState<UserRecord[]>([])
	const [pagination, setPagination] = useState<Pagination | null>(null)
	const [errorMessage, setErrorMessage] = useState<string>("")
	const isLoading = !isMounted || isFetching

	const fetchRecords = useCallback(async (params?: GetUsersParams) => {
		setIsFetching(true)

		const { data, error } = await getUsers(params)

		setIsFetching(false)

		if (error) return setErrorMessage(error)

		if (data) {
			setPagination({
				total: data?.total || data.users.length,
				lastKey: data.lastKey,
			})
			return setRecords((prev) =>
				params?.startAt ? [...prev, ...data.users] : data.users
			)
		}
	}, [])

	const actionItems: TableActionMenuItem[] = [
		{
			id: "register",
			label: "Novo usuário",
			title: "Clique para cadastrar um novo usuário",
			Icon: <PlusCircle />,
			onClick: () => setDrawerProps({ isVisible: true, mode: "create" }),
		},
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de usuários",
			Icon: <ArrowClockwise />,
			onClick: () => void fetchRecords(),
		},
	]

	const onClickToUpdateUser = (record: UserRecord) => {
		setDrawerProps({ isVisible: true, mode: "update", user: record })
	}

	useEffect(() => {
		setIsMounted(true)
		return () => setIsMounted(false)
	}, [])

	useEffect(() => {
		void fetchRecords()
	}, [fetchRecords])

	return (
		<Box width="100%">
			<PageTitle>Usuários</PageTitle>

			<Text>
				Nesta página você encontra as informações dos usuários atualmente
				cadastrados no sistema.
			</Text>

			<DefaultAlert
				status="error"
				mt={8}
				isVisible={!!errorMessage}
				message={errorMessage}
			/>

			{!!drawerProps && (
				<UsersDrawer
					isVisible={drawerProps.isVisible}
					mode={drawerProps.mode}
					user={drawerProps.user}
					onClose={() => setDrawerProps(null)}
					fetchRecords={fetchRecords}
				/>
			)}

			{!errorMessage && (
				<UsersTable
					actionItems={actionItems}
					isLoading={isLoading}
					records={records}
					pagination={pagination}
					onClickToUpdateUser={onClickToUpdateUser}
					fetchRecords={fetchRecords}
				/>
			)}
		</Box>
	)
}
