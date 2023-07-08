import { GetDataResponse } from "~/interfaces/ServerResponse"

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

export interface PartnerReportRecord extends PartnerRecord {
	arrears: string[]
}

export interface PartnerValues extends Pick<Partner, "name"> {
	autoRegistrationId: boolean
	id?: string
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
	registrationId?: string
}

export interface CreatePartnerResponse {
	partner: Partner
}

export interface UpdatePartnerPayload {
	id: string
	registrationId?: string
	name?: string
	autoRegistration?: boolean
}

export interface UpdatePartnerResponse {
	partner: Partner
}

export interface DeletePartnerPayload {
	id: string
}

export interface DeletePartnerResponse {
	success: boolean
}

export interface PartnerDeletionModalData {
	registrationId: string
	id: string
	name: string
}

type PartnerDrawerMode = "create" | "update"

export interface PartnerDrawerProps {
	isVisible: boolean
	mode: PartnerDrawerMode
	partner?: Partner
	onClose: () => void
}

export interface GetPartnersResponse extends GetDataResponse {
	partners: Partner[]
}
