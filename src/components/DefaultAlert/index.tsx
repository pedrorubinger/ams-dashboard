/* eslint-disable import/named */
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertProps,
	CloseButton,
	Flex,
} from "@chakra-ui/react"

interface Props extends AlertProps {
	/** @default false */
	isVisible?: boolean
	message: string
	onClose?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const DefaultAlert: React.FC<Props> = ({
	isVisible = false,
	message,
	onClose,
	...rest
}) => {
	if (!isVisible) return null

	return (
		<Alert {...rest}>
			<Flex w="100%">
				<AlertIcon />
				<AlertDescription>{message}</AlertDescription>
			</Flex>

			{!!onClose && (
				<CloseButton
					alignSelf="flex-start"
					position="relative"
					right={-1}
					top={-0.5}
					onClick={onClose}
				/>
			)}
		</Alert>
	)
}

DefaultAlert.defaultProps = {
	isVisible: false,
}
