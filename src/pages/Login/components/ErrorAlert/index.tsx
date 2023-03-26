import {
	Alert,
	AlertDescription,
	AlertIcon,
	CloseButton,
	Flex,
} from "@chakra-ui/react"

interface Props {
	/** @default false */
	isVisible?: boolean
	message: string
	onClose?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const LoginErrorAlert: React.FC<Props> = ({
	isVisible = false,
	onClose,
	message,
}) => {
	if (!isVisible) return null

	return (
		<Alert status="error" mb="5">
			<Flex w="100%">
				<AlertIcon />
				<AlertDescription>{message}</AlertDescription>
			</Flex>

			<CloseButton
				alignSelf="flex-start"
				position="relative"
				right={-1}
				top={-0.5}
				onClick={onClose}
			/>
		</Alert>
	)
}

LoginErrorAlert.defaultProps = {
	isVisible: false,
}
