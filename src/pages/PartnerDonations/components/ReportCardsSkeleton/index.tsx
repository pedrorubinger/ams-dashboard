import { Skeleton, Stack } from "@chakra-ui/react"

import { ContentSection } from "~/components"

interface Props {}

export const ReportCardsSkeleton: React.FC<Props> = () => {
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
		</>
	)
}
