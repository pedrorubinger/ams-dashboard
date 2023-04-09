import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"

import { DefaultTheme } from "~/styles/theme"
import { Router } from "~/router"

const App = () => {
	return (
		<ChakraProvider theme={DefaultTheme}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
