import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import { Box, Flex, Link, Text, useToast } from "@chakra-ui/react"
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
import {
	DonationsReport,
	ReportsDateFilter,
	// DonationsDocumentReport,
	SearchDonationSchema,
} from "~/pages/Donations/components"
import { ContentSection, PageTitle, TableActionsMenu } from "~/components"
import { DonationContext, PartnerContext } from "~/contexts"
import { TOAST_OPTIONS } from "~/utils"

interface Props {}

export const Donations: React.FC<Props> = () => {
	const toast = useToast()
	const hasRendered = useRef(true)
	const { error, isFetching, fetchDonations, clearRecords } =
		useContext(DonationContext)
	const {
		error: partnersError,
		isFetching: isFetchingPartners,
		fetchPartners,
	} = useContext(PartnerContext)
	const form = useForm<SearchValues>({
		defaultValues: { date: "" },
		resolver: yupResolver(SearchDonationSchema),
	})
	const isMounted = useIsMounted()
	const [activeFilter, setActiveFilter] = useState<string[] | undefined>()
	const isLoading = isFetching || !isMounted || isFetchingPartners
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
		const format = (value: string) =>
			value?.trim()?.split("/")?.reverse()?.join("-")

		const dates = values?.date?.split("-")
		const initialDate = dates?.[0] ? format(dates[0]) : undefined
		const finalDate = dates?.[1] ? format(dates[1]) : undefined
		const formattedDates =
			initialDate && finalDate ? [initialDate, finalDate] : undefined

		setActiveFilter(formattedDates)
	}, [])

	const actionItems: TableActionMenuItem[] = [
		{
			id: "refresh",
			label: "Recarregar registros",
			title: "Clique para atualizar a listagem de contribuições",
			Icon: <ArrowClockwise />,
			onClick: () => {
				clearRecords()
				void fetchDonations()
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
		if (hasRendered.current) {
			hasRendered.current = false
			void fetchDonations()
		}
	}, [])

	useEffect(() => {
		void fetchPartners({ hasPagination: false })
	}, [])

	useEffect(() => {
		if (error) {
			toast({
				...TOAST_OPTIONS,
				description: error,
				title: "Erro ao buscar as contribuições",
				status: "error",
			})
		}
	}, [error])

	useEffect(() => {
		if (partnersError) {
			toast({
				...TOAST_OPTIONS,
				description: partnersError,
				title: "Erro ao buscar os associados",
				status: "error",
			})
		}
	}, [partnersError])

	return (
		<Box mb={3}>
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
		</Box>
	)
}
