<template>
  <div>
    <el-card class="box-card">
      <div class="tag-container">
        <div
          v-for="(item, index) in bankList"
          :key="item.id"
          class="tag"
          :title="item.content"
        >
          {{ item.name }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetBankList } from '@/api/question_bank'
import type {
  BankList,
  getBankListResponseData,
} from '@/api/question_bank/type'
import useUserStore from '@/store/modules/user'
import { onMounted, reactive } from 'vue'

let userStore = useUserStore()

let bankList = reactive<BankList>([])

onMounted(async () => {
  let result: getBankListResponseData = await reqGetBankList(
    userStore.grade as number,
  )
  if (result.code == 200 && result.data?.bank_list) {
    bankList.splice(0, bankList.length, ...(result.data?.bank_list as BankList))
  }
})
</script>

<style scoped lang="scss">
.box-card {
  min-height: 620px;
  position: relative;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
}
.tag:hover {
  transform: scale(1.1);
  background-color: #409eff;
  color: #fff;
}
</style>
