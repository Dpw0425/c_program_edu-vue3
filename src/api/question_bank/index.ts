import request from "@/utils/request"
import type { getBankListResponseData } from "./type"

const BANK_API = '/bank'

enum API {
    BANK_LIST_URL = BANK_API + '/list',
}

export const reqGetBankList = (grade: number) =>
    request.get<any, getBankListResponseData>(API.BANK_LIST_URL + `?grade=${grade}`)
