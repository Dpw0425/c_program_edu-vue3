export interface verifyForm {
    email: string
    channel: string
}

interface normalData {}
export interface verifyResponseData {
    code: number
    message: string
    data?: normalData
    error_type?: string
}