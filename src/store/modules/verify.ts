import { defineStore } from 'pinia'
import { onBeforeUnmount, ref, watch } from 'vue'

let useCountdownStore = defineStore('CountdownStore', () => {
  const isDisabled = ref(false)
  const remainingSeconds = ref(0)

  let timer: any = null

  // 加载本地存储
  const loadLocalStorage = () => {
    const savedTime = localStorage.getItem('remainingSeconds')
    const savedDisabled = localStorage.getItem('isDisabled')

    if (savedTime) {
      remainingSeconds.value = parseInt(savedTime)
      isDisabled.value = savedDisabled === 'true'

      if (isDisabled.value) {
        startCountdown(true)
      }
    }
  }

  // 开始倒计时
  const startCountdown = (isRecover = false) => {
    if (!isRecover) {
      isDisabled.value = true
      remainingSeconds.value = 60
    }

    localStorage.setItem('remainingSeconds', remainingSeconds.value.toString())
    localStorage.setItem('isDisabled', 'true')

    if (timer) clearInterval(timer)

    timer = setInterval(() => {
      remainingSeconds.value--
      localStorage.setItem(
        'remainingSeconds',
        remainingSeconds.value.toString(),
      )

      if (remainingSeconds.value <= 0) {
        clearInterval(timer!)
        isDisabled.value = false
        remainingSeconds.value = 60
        localStorage.removeItem('remainingSeconds')
        localStorage.removeItem('isDisabled')
        timer = null
      }
    }, 1000)
  }

  // 重置倒计时
  const resetCountdown = () => {
    if (timer) clearInterval(timer)
    isDisabled.value = false
    remainingSeconds.value = 0
    localStorage.removeItem('remainingSeconds')
    localStorage.removeItem('isDisabled')
    timer = null
  }

  loadLocalStorage()

  watch(
    [isDisabled, remainingSeconds],
    () => {
      if (remainingSeconds.value <= 0) {
        resetCountdown()
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  return {
    isDisabled,
    remainingSeconds,
    startCountdown,
    resetCountdown,
  }
})

export default useCountdownStore
