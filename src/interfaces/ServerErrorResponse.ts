import { ErrorCode } from "~/interfaces/ErrorCode"

export interface ServerErrorResponse {
	code?: ErrorCode
	error: {
		_original: object
		details: [
			{
				message: ErrorCode
				path: string[]
				type: string
				context: {
					invalids: [
						{
							adjust: null
							in: boolean
							iterables: null
							map: null
							separator: string
							type: string
							ancestor: number
							path: string
							depth: number
							key: string
							root: string
							display: string
						}
					]
					label: string
					value: string
					key: string
				}
			}
		]
	}
}
