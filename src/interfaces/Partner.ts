export interface Partner {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}

export interface PartnerRecord extends Partner {}

export interface PartnerValues extends Pick<Partner, "name" | "id"> {}
