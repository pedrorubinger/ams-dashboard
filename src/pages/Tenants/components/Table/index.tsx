import React from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	GetTenantsParams,
	Pagination,
	TableActionMenuItem,
	Tenant,
} from "~/interfaces"
import { dateFormatter } from "~/utils"
import { columns } from "~/pages/Tenants/components/Table/utils"
import {
	TableActionsMenu,
	TablePaginationSkeleton,
	TableStatus,
	TableWrapper,
} from "~/components"

interface Props {
	isLoading: boolean
	records: Tenant[]
	pagination: Pagination | null
	actionItems: TableActionMenuItem[]
	fetchRecords: (params?: GetTenantsParams) => Promise<void>
}

export const TenantsTable: React.FC<Props> = ({
	pagination,
	isLoading,
	records,
	actionItems,
	fetchRecords,
}) => {
	const count: number = records?.length
	const total: number | undefined = pagination?.total
	const isTableBodyVisible: boolean = !isLoading && !!records.length

	const onClickToGetMore = async () => {
		await fetchRecords({ startAt: pagination?.lastKey })
	}

	return (
		<TableWrapper>
			<TableActionsMenu items={actionItems} isDisabled={isLoading} />

			<Table variant="striped">
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
								<Tr key={record.id}>
									<Td>{record.name}</Td>
									<Td>{record.responsible}</Td>
									<Td>{dateFormatter.format(new Date(record.createdAt))}</Td>
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
