import { extendTheme, theme, type ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
	useSystemColorMode: true,
}
const bgGray = { 100: "#f9f9f9" }

export const DefaultTheme = extendTheme({
	fonts: {
		body: "Nunito, sans-serif",
		heading: "Nunito, sans-serif",
		mono: "Nunito, monospace",
	},
	colors: {
		...theme.colors,
		primary: {
			100: "#B3C9F1",
			200: "#8DAEE5",
			300: "#6792D9",
			400: "#3F77CD",
			500: "#2469D9",
			600: "#1D5BBF",
			700: "#1A4D96",
			800: "#133A6F",
			900: "#0D2748",
		},
	},
	styles: {
		global: {
			body: {
				margin: 0,
				padding: 0,
				boxSizing: "border-box",
				backgroundColor: bgGray[100],
			},
		},
	},
	...config,
})
