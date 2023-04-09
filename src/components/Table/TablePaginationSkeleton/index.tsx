import { Skeleton, Stack } from "@chakra-ui/react"

interface Props {}

export const TablePaginationSkeleton: React.FC<Props> = () => {
	return (
		<Stack mt="2" w="100%">
			<Skeleton height="40px" minWidth="100%" background="" />
			<Skeleton height="40px" minWidth="100%" />
			<Skeleton height="40px" minWidth="100%" />
		</Stack>
	)
}
