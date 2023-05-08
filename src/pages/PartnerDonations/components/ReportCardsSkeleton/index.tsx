import { Skeleton, Stack } from "@chakra-ui/react"

import { ContentSection } from "~/components"

interface Props {
	hasFilter: boolean
}

export const ReportCardsSkeleton: React.FC<Props> = ({ hasFilter }) => {
	return (
		<>
			<ContentSection mt={6}>
				<Stack mt="2" w="100%">
					<Skeleton height="15px" width="60%" background="" />
					<Skeleton height="15px" width="90%" />
				</Stack>
			</ContentSection>

			<ContentSection mt={6}>
				<Stack mt="2" w="100%">
					<Skeleton height="15px" width="60%" background="" />
					<Skeleton height="15px" width="90%" />
				</Stack>
			</ContentSection>

			<ContentSection mt={6}>
				<Stack mt="2" w="100%">
					<Skeleton height="15px" width="60%" background="" />
					<Skeleton height="15px" width="90%" />
				</Stack>
			</ContentSection>

			{!!hasFilter && (
				<ContentSection mt={6}>
					<Stack mt="2" w="100%">
						<Skeleton height="15px" width="60%" background="" />
						<Skeleton height="15px" width="90%" />
					</Stack>
				</ContentSection>
			)}
		</>
	)
}
