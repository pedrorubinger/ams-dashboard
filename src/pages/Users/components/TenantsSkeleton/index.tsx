import React from "react"
import { Skeleton, Stack } from "@chakra-ui/react"

interface Props {}

export const TenantsSkeleton: React.FC<Props> = () => {
	return (
		<Stack mt="2" w="100%">
			<Skeleton height="20px" width="100%" background="" />
			<Skeleton height="20px" width="100%" />
			<Skeleton height="20px" width="75%" />
			<Skeleton height="20px" width="75%" />
			<Skeleton height="20px" width="20%" />
		</Stack>
	)
}
