<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        class="register_form"
        :model="registerForm"
        :rules="rules"
        ref="registerValidate"
      >
        <el-upload
          class="avatar_uploader"
          action="#"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <div v-else class="avatar_uploader_icon">
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </el-upload>
        <el-form-item>
          <label>昵称</label>
          <el-input v-model="registerForm.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item>
          <label>邮箱号</label>
          <el-input v-model="registerForm.email" placeholder="邮箱号" />
        </el-form-item>
        <el-form-item>
          <label>验证码</label>
          <el-input placeholder="图片验证码" style="margin-bottom: 3px;" />
          <div class="verify_code">
            <el-input v-model="registerForm.verify_code" placeholder="邮箱验证码" />
            <el-button class="verify_btn" type="primary" plain @click="getVerifyCode" :disabled="counting">{{ counting ? countdown + ' 秒后重新发送' : '获取验证码' }}</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <label>密码</label>
          <el-input v-model="registerForm.password" placeholder="密码" style="margin-bottom: 3px;" />
          <el-input v-model="registerForm.password" placeholder="请再次输入" />
        </el-form-item>
        <el-form-item>
          <el-button>Default</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'

const registerForm = reactive({
  nickname: '',
  password: '',
  avatar: '',
  email: '',
  verify_code: '',
})
let imageUrl = ref()

// 上传成功回调
const uploadSuccess = () => {}

// 上传前校验
const beforeUpload = () => {}

const counting = ref(false)
const countdown = ref(60)
const getVerifyCode = () => {
  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerForm.email)
  ) {
    ElNotification({
      type: 'error',
      message: '请输入正确的邮箱地址',
    })
    return
  }

  // TODO: 发送验证码

  counting.value = true
  countdown.value = 60

  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
      counting.value = false // 结束倒计时
    }
  }, 1000)
}

const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
}
</script>

<style scoped lang="scss">
.register_container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 40px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    opacity: 0.7;
    z-index: -1;
  }
}

.register_box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  .register_form {
    color: rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar_uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      align-items: center;
      display: flex;
      justify-content: center;
      overflow: hidden;
      width: 178px;
      height: 178px;
      margin-bottom: 6px;

      &:hover {
        border-color: #409eff;
      }

      .avatar_uploader_icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }

      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }

    .el-form-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 85%;
      margin-bottom: 6px;
    }

    .label {
      margin-bottom: 6px;
      font-size: 16px;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.75);
    }
  }
}

.verify_code {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
}
</style>
