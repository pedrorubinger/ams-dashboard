import React, { useCallback, useContext, useEffect, useState } from "react"
import { Flex, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowClockwise, FilePdf } from "phosphor-react"
// import { usePDF } from "@react-pdf/renderer"

import {
	DonationSearchValues as SearchValues,
	TableActionMenuItem,
} from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { useUserStore } from "~/store"
import {
	DonationsReport,
	ReportsDateFilter,
	// DonationsDocumentReport,
	SearchDonationSchema,
} from "~/pages/Donations/components"
import { ContentSection, PageTitle, TableActionsMenu } from "~/components"
import { DonationContext } from "~/contexts"

interface Props {}

export const Donations: React.FC<Props> = () => {
	const { user } = useUserStore()
	const { isFetching, fetchDonations } = useContext(DonationContext)
	const form = useForm<SearchValues>({
		defaultValues: { date: "" },
		resolver: yupResolver(SearchDonationSchema),
	})
	const isMounted = useIsMounted()
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

	const onSearchValues = useCallback((values?: SearchValues) => {
		console.log("values:", values)

		setActiveFilter(values?.date)
	}, [])

	const actionItems: TableActionMenuItem[] = [
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de contribuições",
			Icon: <ArrowClockwise />,
			onClick: () => void fetchDonations(),
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
		void fetchDonations()
	}, [fetchDonations])

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
							onSearchValues={onSearchValues}
						/>
					</FormProvider>

					<TableActionsMenu mb={4} items={actionItems} isDisabled={isLoading} />
				</Flex>
			</ContentSection>

			<DonationsReport
				activeFilter={activeFilter}
				isLoading={isLoading}
				hasFilter={hasFilter}
			/>
		</>
	)
}
