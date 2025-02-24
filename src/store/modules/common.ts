import { reqGetVerifyCode } from '@/api/common'
import type { verifyForm, verifyResponseData } from '@/api/common/type'
import { defineStore } from 'pinia'
import type { commonState } from '../types/common'
import { carouselTestData } from '../constants/carousel'

let useCommonStore = defineStore('CommonStore', {
  state: (): commonState => {
    return {
      carousel: null,
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
    },

    // 设置主页轮播图
    GetCarousel() {
      // TODO: 切换成真正接口
      // test data
      let carouselList: string[] = [
        carouselTestData.testData1,
        carouselTestData.testData2,
        carouselTestData.testData3,
      ]
      this.carousel = carouselList
    },
  },
  getters: {},
})

export default useCommonStore
