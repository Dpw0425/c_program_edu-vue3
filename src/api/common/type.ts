import type { NormalData, ResponseData } from "../type"

export interface verifyForm {
  email: string
  channel: string
}

export interface verifyResponseData extends ResponseData {
  data?: NormalData
}
