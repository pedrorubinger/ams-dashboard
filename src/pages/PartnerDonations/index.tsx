import React, { useCallback, useEffect, useState } from "react"
import { Flex, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowClockwise, FilePdf } from "phosphor-react"
import { usePDF } from "@react-pdf/renderer"

import {
	PartnerDonation,
	PartnerDonationBillingMonth,
	PartnerDonationCategory,
	PartnerDonationSearchValues as SearchValues,
	TableActionMenuItem,
} from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { useUserStore } from "~/store"
import { ReportsSection } from "~/pages/PartnerDonations/styles"
import {
	ReportCardsSkeleton,
	PartnerDonationsReport,
	ReportsDateFilter,
	DonationsDocumentReport,
	SearchPartnerDonationSchema,
} from "~/pages/PartnerDonations/components"
import { ContentSection, PageTitle, TableActionsMenu } from "~/components"

interface Props {}

const initialValues: PartnerDonation[] = [
	{
		id: "1",
		billingMonth: [PartnerDonationBillingMonth.APR],
		billingYear: 2023,
		category: PartnerDonationCategory.PIX,
		createdAt: new Date("2023-04-16"),
		updatedAt: new Date("2023-04-16"),
		partnerId: "1",
		value: 15000,
	},
	{
		id: "2",
		billingMonth: [PartnerDonationBillingMonth.APR],
		billingYear: 2023,
		category: PartnerDonationCategory.COPASA,
		createdAt: new Date("2023-04-03"),
		updatedAt: new Date("2023-04-03"),
		partnerId: "1",
		value: 45000,
	},
	{
		id: "3",
		billingMonth: [PartnerDonationBillingMonth.MAR],
		billingYear: 2023,
		category: PartnerDonationCategory.COPASA,
		createdAt: new Date("2023-03-12"),
		updatedAt: new Date("2023-03-12"),
		partnerId: "1",
		value: 32540,
	},
	{
		id: "4",
		billingMonth: [PartnerDonationBillingMonth.JAN],
		billingYear: 2023,
		category: PartnerDonationCategory.TICKET,
		createdAt: new Date("2023-01-11"),
		updatedAt: new Date("2023-01-11"),
		partnerId: "1",
		value: 21500,
	},
	{
		id: "5",
		billingMonth: [PartnerDonationBillingMonth.DEC],
		billingYear: 2022,
		category: PartnerDonationCategory.PIX,
		createdAt: new Date("2022-12-14"),
		updatedAt: new Date("2022-12-14"),
		partnerId: "1",
		value: 5600,
	},
	{
		id: "6",
		billingMonth: [PartnerDonationBillingMonth.NOV],
		billingYear: 2022,
		category: PartnerDonationCategory.PIX,
		createdAt: new Date("2022-11-14"),
		updatedAt: new Date("2022-11-14"),
		partnerId: "1",
		value: 5200,
	},
	{
		id: "7",
		billingMonth: [PartnerDonationBillingMonth.OCT],
		billingYear: 2022,
		category: PartnerDonationCategory.PIX,
		createdAt: new Date("2022-10-03"),
		updatedAt: new Date("2022-10-04"),
		partnerId: "1",
		value: 4500,
	},
	{
		id: "8",
		billingMonth: [PartnerDonationBillingMonth.AUG],
		billingYear: 2022,
		category: PartnerDonationCategory.COPASA,
		createdAt: new Date("2022-08-12"),
		updatedAt: new Date("2022-08-12"),
		partnerId: "1",
		value: 2300,
	},
	{
		id: "9",
		billingMonth: [PartnerDonationBillingMonth.AUG],
		billingYear: 2022,
		category: PartnerDonationCategory.PIX,
		createdAt: new Date("2022-08-05"),
		updatedAt: new Date("2022-08-05"),
		partnerId: "1",
		value: 12000,
	},
	{
		id: "10",
		billingMonth: [PartnerDonationBillingMonth.JUL],
		billingYear: 2022,
		category: PartnerDonationCategory.PIX,
		createdAt: new Date("2023-03-09"),
		updatedAt: new Date("2023-03-09"),
		partnerId: "1",
		value: 10000,
	},
]

export const PartnerDonations: React.FC<Props> = () => {
	const { user } = useUserStore()
	const form = useForm<SearchValues>({
		defaultValues: { date: "" },
		resolver: yupResolver(SearchPartnerDonationSchema),
	})
	const isMounted = useIsMounted()
	const [isFetching, setIsFetching] = useState(false)
	const [records, setRecords] = useState<PartnerDonation[]>(initialValues)
	const [activeFilter, setActiveFilter] = useState<string | undefined>()
	const isLoading = !isMounted() || isFetching
	const hasFilter = !!activeFilter

	const [instance] = usePDF({
		document: (
			<DonationsDocumentReport
				tenantId={String(user?.tenantId)}
				isRange={hasFilter}
				date={activeFilter}
				records={records}
			/>
		),
	})
	const documentFileName = `Contribuicoes_${new Date().getTime()}.pdf`

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
					<PartnerDonationsReport
						hasFilter={hasFilter}
						dateRange={activeFilter}
					/>
				)}
			</ReportsSection>
		</>
	)
}
