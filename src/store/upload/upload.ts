import { reqUploadAvatar } from "@/api/upload";
import type { uploadAvatarForm, uploadAvatarResponse } from "@/api/upload/type";
import { defineStore } from "pinia";
import type { UploadState } from "./types/type";

let useUploadStore = defineStore('UploadStore', {
    state: (): UploadState => {
        return {
            avatar_url: '',
        }
    },
    actions: {
        // 头像上传
        async uploadAvatar(data: uploadAvatarForm) {
            let result: uploadAvatarResponse = await reqUploadAvatar(data)
            if (result.code == 200) {
                this.avatar_url = result.data?.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters: {},
})

export default useUploadStore