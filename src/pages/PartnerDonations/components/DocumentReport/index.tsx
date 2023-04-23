import React from "react"
import { Page, Text, View, Document } from "@react-pdf/renderer"

interface Props {}

export const DonationsDocumentReport: React.FC<Props> = () => {
	return (
		<Document>
			<Page size="A4">
				<View>
					<Text>Section #1</Text>
				</View>

				<View>
					<Text>Section #2</Text>
				</View>
			</Page>
		</Document>
	)
}
