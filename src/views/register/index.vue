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
          :http-request="uploadAvatar"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <div v-else class="avatar_uploader_icon">
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </el-upload>
        <el-form-item prop="user_name">
          <label>用户名</label>
          <el-input
            v-model="registerForm.user_name"
            placeholder="昵称"
            maxlength="10"
            name="nickname"
          />
        </el-form-item>
        <el-form-item prop="email">
          <label>邮箱号</label>
          <el-input
            v-model="registerForm.email"
            placeholder="邮箱号"
            name="email"
          />
        </el-form-item>
        <el-form-item prop="verify_code">
          <label>邮箱验证码</label>
          <div class="verify_code">
            <el-input
              v-model="registerForm.verify_code"
              placeholder="邮箱验证码"
              name="verify_code"
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
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="密码"
            name="password"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入"
            name="confirmPassword"
          />
        </el-form-item>
        <el-form-item prop="grade">
          <label>选择年级</label>
          <el-select v-model="registerForm.grade" palceholder="请选择">
            <!-- TODO: 替换真实接口获取年级 -->
            <el-option v-for="item in Grades" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="student_id">
          <label>绑定学号</label>
          <el-input
            v-model="registerForm.student_id"
            placeholder="请输入学号"
            name="student_id"
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
import { onMounted, reactive, ref } from 'vue'
import { ElNotification, type UploadRequestOptions } from 'element-plus'
import useCountdownStore from '@/store/modules/verify'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import useUploadStore from '@/store/modules/upload'
import useCommonStore from '@/store/modules/common'
import { Grades } from '@/store/constants/grade'

const registerForm = reactive({
  user_name: '',
  password: '',
  confirmPassword: '',
  student_id: null,
  avatar: '',
  email: '',
  grade: null,
  verify_code: '',
})
let imageUrl = ref()
let registerValidate = ref()

let userStore = useUserStore()
let $router = useRouter()
let uploadStore = useUploadStore()
let commonStore = useCommonStore()

const toLogin = () => {
  $router.push('/login')
}

// 上传前校验
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const sizeLimit = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElNotification({
      type: 'error',
      message: '只能上传图片文件',
    })
    return false
  }
  if (!sizeLimit) {
    ElNotification({
      type: 'error',
      message: '图片大小不能超过 2MB',
    })
    return false
  }

  return true
}

// 上传头像
const uploadAvatar = async (options: UploadRequestOptions) => {
  let file = options.file
  let uploadData = { avatar: file }

  // TODO: 将不作为头像使用的上一张上传的图片删除

  try {
    await uploadStore.uploadAvatar(uploadData)
    imageUrl.value = uploadStore.avatar_url
    registerForm.avatar = uploadStore.avatar_url as string
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

// 获取验证码
const countdownStore = useCountdownStore()
const getVerifyCode = async () => {
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

  try {
    const verifyForm = reactive({
      email: registerForm.email,
      channel: 'register',
    })
    await commonStore.GetVerifyCode(verifyForm)
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
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
    await countdownStore.resetCountdown()
    loading.value = false
  } catch (error) {
    loading.value = false
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
// @ts-ignore
const validateStudentID = (rules, value, callback) => {
  if (value && !/^\d+$/.test(String(value))) {
    callback(new Error('学号格式有误'))
  } else {
    callback()
  }
}
const rules = {
  // TODO: 更新校验规则
  user_name: [
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
  student_id: [
    { required: true, message: '请绑定学号', trigger: 'blur' },
    { min: 10, message: '学号格式有误', trigger: ['blur', 'change'] },
    { max: 10, message: '学号格式有误', trigger: ['blur', 'change'] },
    { validator: validateStudentID, trigger: ['blur', 'change'] }
  ],
  grade: [{ required: true, message: '请选择年级', trigger: 'blur' }],
}

onMounted(() => {
  const inputs = document.querySelectorAll('input')
  inputs.forEach((input) => {
    input.setAttribute('autocomplete', 'off')
  })
})
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
