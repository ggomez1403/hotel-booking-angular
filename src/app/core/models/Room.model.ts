export interface Room {
	id: number
	imgUrl: string
	name: string
	available: boolean
	type: string
	capacity: number
	initialPrice: number
	taxesAndFees: number
	totalPrice: number
	bathroomAmenities: string[]
	bedroomAmenities: string[]
	entertainmentAmenities: string[]
	foodAndDrinksAmenities: string[]
	internetAmenities: string[]
	moreAmenities: string[]
	highlights: string[]
}
