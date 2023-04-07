import React, { useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	GetUsersParams,
	Pagination,
	TableActionMenuItem,
	TableRowAction,
	UserRecord,
} from "~/interfaces"
import { dateFormatter } from "~/utils"
import { useUserStore } from "~/store"
import { columns } from "~/pages/Users/components/Table/utils"
import { useDeleteUserModal } from "~/pages/Users/hooks"
import {
	TableActionsMenu,
	TablePaginationSkeleton,
	TableRowActions,
	TableStatus,
	TableWrapper,
} from "~/components"

interface Props {
	isLoading: boolean
	records: UserRecord[]
	pagination: Pagination | null
	actionItems: TableActionMenuItem[]
	fetchRecords: (params?: GetUsersParams) => Promise<void>
	onClickToUpdateUser: (record: UserRecord) => void
}

export const UsersTable: React.FC<Props> = ({
	pagination,
	isLoading,
	records,
	actionItems,
	fetchRecords,
	onClickToUpdateUser,
}) => {
	const { user } = useUserStore()
	const [isPaginating, setIsPaginating] = useState(false)
	const count: number = records?.length
	const total: number | undefined = pagination?.total
	const isTableBodyVisible: boolean = isLoading ? isPaginating : true
	const { Modal: DeleteUser, onOpen } = useDeleteUserModal({ fetchRecords })

	const onClickToGetMore = async () => {
		setIsPaginating(true)
		await fetchRecords({ startAt: pagination?.lastKey })
		setIsPaginating(false)
	}

	const getActions = (record: UserRecord): TableRowAction[] => {
		const isDisabled = user?.id === record.id

		return [
			{
				type: "edit",
				title: "Editar os dados deste usuário",
				isDisabled,
				onClick: () => onClickToUpdateUser(record),
			},
			{
				type: "delete",
				title: "Excluir este usuário",
				isDisabled,
				onClick: () => onOpen({ id: record.id, name: record.name }),
			},
		]
	}

	return (
		<TableWrapper>
			<DeleteUser />
			<TableActionsMenu items={actionItems} isDisabled={isLoading} />

			<Table>
				<TableStatus
					count={count}
					total={total}
					isLoading={isLoading}
					onClickToGetMore={() => void onClickToGetMore()}
				/>

				<Thead>
					<Tr>
						{columns.map((column) => {
							return <Th key={column.id}>{column.label}</Th>
						})}
					</Tr>
				</Thead>

				{isTableBodyVisible && (
					<Tbody width="100%">
						{records.map((record) => {
							return (
								<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
									<Td>{record.name}</Td>
									<Td>{record.email}</Td>
									<Td>{record?.tenantName}</Td>
									<Td>{dateFormatter.format(new Date(record.createdAt))}</Td>
									<Td>
										<TableRowActions actions={getActions(record)} />
									</Td>
								</Tr>
							)
						})}
					</Tbody>
				)}
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
