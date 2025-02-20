import { reqGetVerifyCode } from "@/api/common"
import type { verifyForm, verifyResponseData } from "@/api/common/type"
import { defineStore } from "pinia"

let useCommonStore = defineStore('CommonStore', {
    state: () => {
        return {

        }
    },
    actions: {
        // 发送验证码
        async GetVerifyCode(data: verifyForm) {
            let result: verifyResponseData = await reqGetVerifyCode(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters: {},
})

export default useCommonStore