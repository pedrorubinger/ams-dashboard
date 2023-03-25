import { Link, Flex, Text } from "@chakra-ui/react"

interface Props {}

const CREATOR_GITHUB_URL: string = import.meta.env.VITE_CREATOR_GITHUB_URL
const APPLICATION_VERSION: string = import.meta.env.VITE_APPLICATION_VERSION

export const DashboardFooter: React.FC<Props> = () => {
	const year = new Date().getFullYear()

	return (
		<Flex flex={1} alignItems="flex-end" justifyContent="center" mt={3}>
			<Text fontSize="sm" color="gray.400">
				AMS by{" "}
				<Link href={CREATOR_GITHUB_URL} target="_blank" color="primary.200">
					Pedro Rubinger
				</Link>{" "}
				&copy; v{APPLICATION_VERSION} ~ {year} <br />
			</Text>
		</Flex>
	)
}
