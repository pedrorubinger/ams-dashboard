// eslint-disable-next-line import/named
import { Heading, HeadingProps } from "@chakra-ui/react"

interface Props extends HeadingProps {
	children: React.ReactNode
}

export const PageTitle: React.FC<Props> = ({ children, ...rest }) => {
	return (
		<Heading color="gray.600" size="lg" mb="5" {...rest}>
			{children}
		</Heading>
	)
}
