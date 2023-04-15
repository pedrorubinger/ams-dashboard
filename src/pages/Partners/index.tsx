import { useCallback, useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { ArrowClockwise, PlusCircle } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"

import {
	PartnerRecord,
	SearchPartnerValues,
	TableActionMenuItem,
} from "~/interfaces"
import { PageTitle } from "~/components"
import {
	PartnersTable,
	SearchPartner,
	SearchPartnersSchema,
} from "~/pages/Partners/components"
import { yupResolver } from "@hookform/resolvers/yup"

const defaultValues: SearchPartnerValues = { type: "id", value: "" }

export const Partners: React.FC = () => {
	const form = useForm<SearchPartnerValues>({
		defaultValues,
		resolver: yupResolver(SearchPartnersSchema),
	})
	const [isFetching, setIsFetching] = useState(false)
	const [records, setRecords] = useState<PartnerRecord[]>([])

	const fetchRecords = useCallback(async () => {}, [])

	const actionItems: TableActionMenuItem[] = [
		{
			id: "register",
			label: "Novo associado",
			title: "Clique para cadastrar um novo associado",
			Icon: <PlusCircle />,
			onClick: () => {},
			// onClick: () => setDrawerProps({ isVisible: true, mode: "create" }),
		},
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de associados",
			Icon: <ArrowClockwise />,
			onClick: () => void fetchRecords(),
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
				<SearchPartner isLoading={isFetching} />
			</FormProvider>

			<PartnersTable
				records={records}
				actionItems={actionItems}
				isLoading={isFetching}
			/>
		</Box>
	)
}
