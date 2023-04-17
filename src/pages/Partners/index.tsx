import { useCallback, useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { PlusCircle } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
	FinancialSupportListDrawerProps,
	NewPartnerFinancialSupportDrawerProps,
	PartnerRecord,
	SearchPartnerValues,
	TableActionMenuItem,
} from "~/interfaces"
import {
	PartnersTable,
	SearchPartner,
	SearchPartnersSchema,
	NewFinancialSupportDrawer,
	FinancialSupportListDrawer,
} from "~/pages/Partners/components"
import { PageTitle } from "~/components"

type NewSupportDrawer = null | Omit<
	NewPartnerFinancialSupportDrawerProps,
	"onClose"
>
type ListSupportsDrawer = null | Omit<
	FinancialSupportListDrawerProps,
	"onClose"
>

const defaultValues: SearchPartnerValues = { type: "id", value: "" }
const mockedData: PartnerRecord[] = [
	{
		createdAt: new Date("2022-09-19"),
		updatedAt: new Date("2022-09-19"),
		id: "93489",
		name: "Pedro Henrique",
	},
]

export const Partners: React.FC = () => {
	const form = useForm<SearchPartnerValues>({
		defaultValues,
		resolver: yupResolver(SearchPartnersSchema),
	})
	const [isFetching, setIsFetching] = useState(false)
	const [records, setRecords] = useState<PartnerRecord[]>([])
	const [financialSupportListDrawer, setFinancialSupportListDrawer] =
		useState<ListSupportsDrawer>(null)
	const [newFinancialSupportDrawer, setNewFinancialSupportDrawer] =
		useState<NewSupportDrawer>(null)

	const fetchRecords = useCallback(async (params: SearchPartnerValues) => {
		setIsFetching(true)
		console.log("params:", params)

		setTimeout(() => {
			setIsFetching(false)
			setRecords(mockedData)
		}, 3000)
	}, [])

	const onCloseNewFinancialSupportDrawer = () =>
		setNewFinancialSupportDrawer(null)

	const onCloseFinancialSupportListDrawer = () =>
		setFinancialSupportListDrawer(null)

	const onAddNewFinancialSupport = (partner: PartnerRecord) =>
		setNewFinancialSupportDrawer({
			isVisible: true,
			mode: "create",
			partner,
		})

	const onViewFinancialSupportList = (partner: PartnerRecord) =>
		setFinancialSupportListDrawer({
			isVisible: true,
			partner,
		})

	const actionItems: TableActionMenuItem[] = [
		{
			id: "register",
			label: "Novo associado",
			title: "Clique para cadastrar um novo associado",
			Icon: <PlusCircle />,
			onClick: () => {},
		},
	]

	return (
		<Box width="100%">
			<PageTitle>Associados</PageTitle>

			<Text>
				Nesta seção você encontra a lista de associados da APAE. Para começar,
				procure um associado pelo seu número de matrícula ou nome.
			</Text>

			<FormProvider {...form}>
				<SearchPartner isLoading={isFetching} fetchRecords={fetchRecords} />
			</FormProvider>

			{!!newFinancialSupportDrawer && (
				<NewFinancialSupportDrawer
					onClose={onCloseNewFinancialSupportDrawer}
					mode={newFinancialSupportDrawer.mode}
					partner={newFinancialSupportDrawer.partner}
					isVisible
				/>
			)}

			{!!financialSupportListDrawer && (
				<FinancialSupportListDrawer
					partner={financialSupportListDrawer.partner}
					onClose={onCloseFinancialSupportListDrawer}
					isVisible
				/>
			)}

			<PartnersTable
				records={records}
				actionItems={actionItems}
				isLoading={isFetching}
				onViewFinancialSupportList={onViewFinancialSupportList}
				onAddNewFinancialSupport={onAddNewFinancialSupport}
			/>
		</Box>
	)
}
