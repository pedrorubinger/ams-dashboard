import React, { useCallback, useEffect, useState } from "react"
import { Flex, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowClockwise, FilePdf } from "phosphor-react"
// import { usePDF } from "@react-pdf/renderer"

import {
	Donation,
	DonationBillingMonth,
	DonationCategory,
	DonationSearchValues as SearchValues,
	TableActionMenuItem,
} from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { useUserStore } from "~/store"
import { ReportsSection } from "~/pages/Donations/styles"
import {
	ReportCardsSkeleton,
	DonationsReport,
	ReportsDateFilter,
	// DonationsDocumentReport,
	SearchDonationSchema,
} from "~/pages/Donations/components"
import { ContentSection, PageTitle, TableActionsMenu } from "~/components"

interface Props {}

const initialValues: Donation[] = []

export const Donations: React.FC<Props> = () => {
	const { user } = useUserStore()
	const form = useForm<SearchValues>({
		defaultValues: { date: "" },
		resolver: yupResolver(SearchDonationSchema),
	})
	const isMounted = useIsMounted()
	const [isFetching, setIsFetching] = useState(false)
	const [records, setRecords] = useState<Donation[]>(initialValues)
	const [activeFilter, setActiveFilter] = useState<string | undefined>()
	const isLoading = isFetching || !isMounted
	const hasFilter = !!activeFilter

	// const [instance] = usePDF({
	// 	document: (
	// 		<DonationsDocumentReport
	// 			tenantId={String(user?.tenantId)}
	// 			isRange={hasFilter}
	// 			date={activeFilter}
	// 			records={records}
	// 		/>
	// 	),
	// })
	// const documentFileName = `Contribuicoes_${new Date().getTime()}.pdf`

	const fetchRecords = useCallback(async (values?: SearchValues) => {
		setIsFetching(true)
		setActiveFilter(values?.date)
		console.log("fetchRecords > values:", values)

		setTimeout(() => {
			setIsFetching(false)
		}, 3000)
	}, [])

	const actionItems: TableActionMenuItem[] = [
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de contribuições",
			Icon: <ArrowClockwise />,
			onClick: () => {
				void fetchRecords(activeFilter ? { date: activeFilter } : undefined)
			},
		},
		// {
		// 	id: "download",
		// 	label: "Download",
		// 	title:
		// 		"Clique para baixar a lista de contribuições em PDF. Atente-se para o filtro de datas selecionado.",
		// 	Icon: <FilePdf />,
		// 	href: String(instance.url),
		// 	download: documentFileName,
		// 	onClick: () => {} /** it's a link. The download is made automatically. */,
		// },
	]

	useEffect(() => {
		void fetchRecords()
	}, [fetchRecords])

	return (
		<>
			<ContentSection>
				<PageTitle>Contribuições</PageTitle>

				<Text>
					Nesta página você encontra os valores de todas as contribuições
					registradas. Se você deseja ver as contribuições detalhadas para cada
					associado, acesse a página&nbsp;
					<Link to="/associados" color="primary.400" as={RouterLink}>
						Associados
					</Link>
					.
				</Text>

				{/* <Text>
					Você pode clicar no botão de <strong>Ações</strong> e baixar um
					arquivo em <strong>PDF</strong> com todas as contribuições. Se um
					filtro de datas estiver ativo, apenas as contribuições do filtro
					aparecerão no documento baixado.
				</Text> */}

				<Flex
					alignItems="flex-end"
					justifyContent="flex-start"
					flex={1}
					gap={4}
				>
					<FormProvider {...form}>
						<ReportsDateFilter
							isLoading={isLoading}
							hasActiveFilter={hasFilter}
							fetchRecords={fetchRecords}
						/>
					</FormProvider>

					<TableActionsMenu mb={4} items={actionItems} isDisabled={isLoading} />
				</Flex>
			</ContentSection>

			<ReportsSection $hasFilter={hasFilter}>
				{!!isLoading && <ReportCardsSkeleton hasFilter={hasFilter} />}
				{!isLoading && (
					<DonationsReport hasFilter={hasFilter} dateRange={activeFilter} />
				)}
			</ReportsSection>
		</>
	)
}
