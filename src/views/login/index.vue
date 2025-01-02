<template>
  <div class="login_container">
    <el-row>
      <el-col :span="10" :xs="0"></el-col>
      <el-col :span="14" :xs="24">
        <div class="login_box">
          <el-form class="login_form">
            <el-tabs v-model="activeTab" class="login_tabs" @tab-click="resetForm">
              <el-tab-pane label="邮箱登录" name="loginByEmail"></el-tab-pane>
              <el-tab-pane
                label="密码登录"
                name="loginByPassword"
              ></el-tab-pane>
            </el-tabs>

            <el-form-item>
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
                placeholder="请输入邮箱号"
              />
            </el-form-item>
            <el-form-item v-if="activeTab === 'loginByEmail'">
              <div class="verify_code">
                <el-input
                  v-model="loginForm.verify_code"
                  class="verify_code_input"
                  placeholder="请输入验证码"
                />
                <el-button class="verify_btn" plain>获取验证码</el-button>
              </div>
            </el-form-item>
            <el-form-item v-if="activeTab === 'loginByPassword'">
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="loginForm.password"
                show-password
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="login_btn" type="primary" size="default" @click="login" :loading="loading">
                登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <div class="bottom">
                <el-link href="" type="primary">>>&nbsp;前往注册</el-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const activeTab = ref('loginByEmail')
const loading = ref(false)

let userStore = useUserStore()
let $router = useRouter()

const loginForm = reactive({ username: '', password: '', verify_code: '' })

const login = async () => {
  loading.value = true

  try {
    await userStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功!'
    })
    loading.value = false
  } catch(error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}

const resetForm = (tab: any) => {
  if (tab.props.name === 'loginByPassword') {
    loginForm.verify_code = ''
  }
  if (tab.props.name === 'loginByEmail') {
    loginForm.password = ''
  }
}
</script>

<style scoped lang="scss">
.login_container {
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

.login_box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;

  position: relative;
  width: 40%;
  top: 20vh;
  margin-left: 20%;
}

.login_form {
  color: rgba(0, 0, 0, 0.75);

  .login_tabs {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .verify_code {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .verify_code_input {
    flex: 1;
    margin-right: 10px;
  }

  .login_btn {
    width: 100%;
    margin-top: 20px;
  }

  .bottom {
    position: absolute;
    right: 0;
    margin-top: 10px;
  }
}
</style>
