// layout 组件配置仓库
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore('SettingStore', {
    state: () => {
     return {
        refresh: false,
     }   
    }
})

export default useLayoutSettingStore