import { reqGetVerifyCode } from '@/api/common'
import type { verifyForm, verifyResponseData } from '@/api/common/type'
import { defineStore } from 'pinia'
import type { commonState } from '../types/common'
import { carouselTestData } from '../constants/carousel'
import { getLunarDate, getMonthType } from '@/utils/time'
import { monthNames, weekdays } from '../constants/date'

let useCommonStore = defineStore('CommonStore', {
  state: (): commonState => {
    return {
      carousel: null,
      month: '',
      date: '',
      weekday: '',
      monthType: '',
      lunarDate: '',
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

    // 获取日历
    GetCalendar() {
      const today = new Date()
      const monthType = getMonthType(today)

      this.month = monthNames[today.getMonth()]
      this.monthType = monthType
      if (today.getDate() < 10) {
        this.date = '0' + today.getDate().toString()
      } else {
        this.date = today.getDate().toString()
      }
      this.weekday = weekdays[today.getDay()]
      this.lunarDate = getLunarDate(today)
    },
  },
  getters: {},
})

export default useCommonStore
