<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        class="register_form"
        :model="registerForm"
        :rules="rules"
        ref="registerValidate"
      >
        <el-form-item>
          <div class="top">
            <el-link @click="toLogin" type="primary"><<&nbsp;返回登录</el-link>
          </div>
        </el-form-item>
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
        <el-form-item prop="nickname">
          <label>昵称</label>
          <el-input
            v-model="registerForm.nickname"
            placeholder="昵称"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item prop="email">
          <label>邮箱号</label>
          <el-input v-model="registerForm.email" placeholder="邮箱号" />
        </el-form-item>
        <el-form-item prop="verify_code">
          <label>邮箱验证码</label>
          <div class="verify_code">
            <el-input
              v-model="registerForm.verify_code"
              placeholder="邮箱验证码"
            />
            <el-button
              class="verify_btn"
              type="primary"
              plain
              @click="getVerifyCode"
              :disabled="countdownStore.isDisabled"
            >
              {{
                countdownStore.isDisabled
                  ? countdownStore.remainingSeconds + ' 秒后重新发送'
                  : '获取验证码'
              }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="password" v-model="registerForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入"
          />
        </el-form-item>
        <el-form-item style="margin-top: 10px">
          <el-button
            class="register_btn"
            type="primary"
            size="default"
            :loading="loading"
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import useCountdownStore from '@/store/common/verify'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'

const registerForm = reactive({
  nickname: '',
  password: '',
  confirmPassword: '',
  avatar: '',
  email: '',
  verify_code: '',
})
let imageUrl = ref()
let registerValidate = ref()

let userStore = useUserStore()
let $router = useRouter()

const toLogin = () => {
  $router.push('/login')
}

// 上传成功回调
const uploadSuccess = () => {}

// 上传前校验
const beforeUpload = () => {}

// 获取验证码
const countdownStore = useCountdownStore()
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

  countdownStore.startCountdown()

  // TODO: 发送验证码
}

const loading = ref(false)
const register = async () => {
  // 表单校验
  await registerValidate.value.validate()

  loading.value = true

  try {
    await userStore.userRegister(registerForm)
    $router.push('/login')
    ElNotification({
      type: 'success',
      message: '注册成功!',
      title: `恭喜您`,
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

// @ts-ignore
const validateConfirmPassword = (rules, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入不一致'))
  } else {
    callback()
  }
}
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, message: '昵称不得少于 2 个字符', trigger: 'blur' },
    { max: 8, message: '昵称最多为 8 个字符', trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少为 6 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: ['blur', 'change'] },
  ],
  verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
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
  max-height: 647px;
  margin: 0 auto;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  scrollbar-width: thin;
  scrollbar-color: Transparent Transparent;

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
      margin-bottom: 10px;
    }

    .label {
      margin-bottom: 6px;
      font-size: 18px;
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

.register_btn {
  margin-top: 6px;
  width: 100%;
}

.top {
  margin-left: -17px;
  margin-top: -7px;
}
</style>
