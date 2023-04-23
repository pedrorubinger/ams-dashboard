import React from "react"
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer"

import {
	PartnerDonation,
	PartnerDonationCategoryLabel as CategoryLabel,
} from "~/interfaces"
import { dateFormatter, getDateFormatter, priceFormatter } from "~/utils"

interface Props {
	tenantId: string
	isRange: boolean
	records: PartnerDonation[]
	date?: string
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
	author: {
		fontSize: 12,
		textAlign: "center",
		marginBottom: 30,
		marginTop: 15,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
	},
	text: {
		margin: 10,
		fontSize: 10,
		textAlign: "justify",
		borderBottomColor: "gray",
		paddingBottom: 8,
		borderBottomWidth: 1,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
})

export const DonationsDocumentReport: React.FC<Props> = ({
	date,
	isRange,
	records,
	tenantId,
}) => {
	const today = getDateFormatter({
		dateStyle: "long",
		timeStyle: "short",
	}).format(new Date())
	const title =
		isRange && date
			? `Relatório de contribuições registradas entre ${date}`
			: `Relatório de contribuições registradas`

	return (
		<Document>
			<Page style={styles.body}>
				<Text style={styles.header} fixed>
					Emitido em {today}
				</Text>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.author}>APAE {tenantId}</Text>

				{records.map((record) => {
					const paddedMonth = record.billingMonth.toString().padStart(2, "0")
					const billing = `${paddedMonth}/${record.billingYear}`
					const value = priceFormatter.format(record.value / 100)
					const createdAt = dateFormatter.format(record.createdAt)
					const category = CategoryLabel[record.category] as string

					return (
						<Text style={styles.text} key={record.id}>
							&bull;&nbsp;Contribuição no valor de&nbsp;
							{value}&nbsp;da competência&nbsp;
							{billing}
							&nbsp;registrada em&nbsp;
							{createdAt} e categoria&nbsp;
							{category}.
						</Text>
					)
				})}

				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
					fixed
				/>
			</Page>
		</Document>
	)
}
