import { useCallback, useEffect, useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { ArrowClockwise, PlusCircle } from "phosphor-react"

import {
	GetUsersParams,
	Pagination,
	TableActionMenuItem,
	User,
} from "~/interfaces"
import { getUsers } from "~/services/requests"
import { UsersTable } from "~/pages/Users/components"
import { DefaultAlert, PageTitle } from "~/components"

export const Users: React.FC = () => {
	const [isFetching, setIsFetching] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [records, setRecords] = useState<User[]>([])
	const [pagination, setPagination] = useState<Pagination | null>(null)
	const [errorMessage, setErrorMessage] = useState<string>("")
	const isLoading = !isMounted || isFetching

	const actionItems: TableActionMenuItem[] = [
		{
			id: "register",
			label: "Novo usuário",
			title: "Clique para cadastrar um novo usuário",
			Icon: <PlusCircle />,
			onClick: () => {},
		},
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de usuários",
			Icon: <ArrowClockwise />,
			onClick: () => {},
		},
	]

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

	const onClickToUpdateUser = () => {}

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
