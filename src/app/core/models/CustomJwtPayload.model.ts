import { JwtPayload } from 'jwt-decode'

export interface CustomJwtPayload extends JwtPayload {
	firstName: string
	lastName: string
	phoneNumber: string
	role: string
	id: number
	sub: string
	iat: number
	exp: number
}
