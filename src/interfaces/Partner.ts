export interface Partner {
	id: string
	registrationId: string // Matrícula
	name: string
	createdAt: Date
	updatedAt: Date
}

export enum FindPartnerField {
	ID = "registrationId",
	NAME = "name",
}

export interface PartnerRecord extends Partner {}

export interface PartnerValues extends Pick<Partner, "name" | "id"> {
	autoRegistrationId: boolean
}

export interface GetPartnerParams {
	field: FindPartnerField
	content: string
}

export interface SearchPartnerValues extends GetPartnerParams {}

export interface GetPartnerResponse {
	partners: Partner[]
}

export interface CreatePartnerPayload extends Pick<Partner, "name"> {
	id?: string
}

export interface CreatePartnerResponse {
	partner: Partner
}
