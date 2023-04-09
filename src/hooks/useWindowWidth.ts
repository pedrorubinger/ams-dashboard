import { useEffect, useState } from "react"

interface WindowWidthHookResponse {
	width: number
}

export const useWindowWidth = (): WindowWidthHookResponse => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return { width }
}
