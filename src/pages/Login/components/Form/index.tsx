import { useState } from "react"
import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react"
import { Eye, EyeClosed } from "phosphor-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { LoginFormValues as FormValues } from "~/pages/Login/interfaces"
import { LoginSchema } from "~/pages/Login/components/Form/schema"
import { Form, InputLabel } from "~/components"

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: yupResolver(LoginSchema),
	})
	const watchedPassword = watch("password")

	const onSubmit = (values: FormValues) => {
		console.log("submitted values:", values)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isRequired isInvalid={!!errors.email}>
				<InputLabel htmlFor="email">Email</InputLabel>

				<Input
					id="email"
					type="email"
					placeholder="Seu email"
					{...register("email")}
					autoFocus
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors.password} mt={5}>
				<InputLabel htmlFor="password">Senha</InputLabel>

				<InputGroup>
					<Input
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="Sua senha"
						{...register("password")}
					/>
					{!!watchedPassword && (
						<InputRightElement width="4.5rem">
							<Button
								h="1.75rem"
								size="sm"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? <EyeClosed /> : <Eye />}
							</Button>
						</InputRightElement>
					)}
				</InputGroup>

				<FormErrorMessage>
					{errors.password && errors.password.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				colorScheme="primary"
				type="submit"
				title="Clique para fazer login e acessar sua conta"
				isLoading={isSubmitting}
				mt={6}
			>
				Entrar
			</Button>
		</Form>
	)
}
