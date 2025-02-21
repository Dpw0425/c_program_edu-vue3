import type { ResponseData } from "../type"

export interface uploadAvatarForm {
    avatar: File
}

interface avatarData {
    avatar: string
}
export interface uploadAvatarResponse extends ResponseData {
    data?: avatarData
}