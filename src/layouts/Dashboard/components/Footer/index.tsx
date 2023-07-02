import { Link, Flex, Text } from "@chakra-ui/react"
import { Tooltip } from "~/components"

import { isDevEnv } from "~/utils"

interface Props {}

const CREATOR_GITHUB_URL: string = import.meta.env.VITE_CREATOR_GITHUB_URL
const APPLICATION_VERSION: string = import.meta.env.VITE_APPLICATION_VERSION

export const DashboardFooter: React.FC<Props> = () => {
	const year = new Date().getFullYear()

	return (
		<Flex flex={1} alignItems="flex-end" justifyContent="center" mt={3}>
			<Flex
				flexDirection="column"
				justifyContent="center"
				width="100%"
				alignItems="center"
			>
				{!!isDevEnv && (
					<Flex alignItems="center" gap="1">
						<Text fontSize="lg" color="blackAlpha.600" fontWeight="bold">
							AMBIENTE DE TESTES
						</Text>

						<Tooltip
							label="Este é um ambiente para validação e testes das funcionalidades. Os dados aqui cadastrados poderão ser excluídos a qualquer momento."
							placement="top-start"
						/>
					</Flex>
				)}

				<Text fontSize="sm" color="gray.400">
					AMS by&nbsp;
					<Link href={CREATOR_GITHUB_URL} target="_blank" color="primary.200">
						Pedro Rubinger
					</Link>
					&nbsp;&copy; v{APPLICATION_VERSION} ~ {year} <br />
				</Text>
			</Flex>
		</Flex>
	)
}
