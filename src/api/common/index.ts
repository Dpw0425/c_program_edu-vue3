import request from "@/utils/request"
import type { verifyForm, verifyResponseData } from "./type"

const COMMON_API = "/common"

enum API {
    GET_VERIFY_CODE_URL = COMMON_API + '/send_email_code'
}

// 发送验证码接口
export const reqGetVerifyCode = (data: verifyForm) =>
    request.post<any, verifyResponseData>(API.GET_VERIFY_CODE_URL, data)