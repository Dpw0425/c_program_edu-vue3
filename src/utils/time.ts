import { bigMonths } from '@/store/constants/date'
// @ts-ignore
import { solar2lunar } from 'solarlunar'

export const getTime = () => {
  let message = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export const getMonthType = (date: Date) => {
  if (date.getMonth() === 1) {
    return isLeapYear(date.getFullYear()) ? '闰' : '平'
  }
  return bigMonths.includes(date.getMonth()) ? '大' : '小'
}

export const getLunarDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const lunarDate = solar2lunar(year, month, day)
  return `农历${lunarDate.monthCn}${lunarDate.dayCn}`
}
