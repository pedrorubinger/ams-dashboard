import { FormHTMLAttributes } from "react"
import styled from "styled-components"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
	/** @default "100%" */
	width?: string
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const StyledForm = styled.form<FormProps>`
	width: ${({ width = "100%" }) => width};
`

export const Form: React.FC<FormProps> = ({ children, onSubmit, ...props }) => {
	return (
		<StyledForm onSubmit={onSubmit} noValidate {...props}>
			{children}
		</StyledForm>
	)
}
