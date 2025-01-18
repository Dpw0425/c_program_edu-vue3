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
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar_uploader_icon"></i>
                </el-upload>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const registerForm = reactive({ nickname: '', password: '', avatar: '', email: '', verify_code: '' })
let imageUrl = ref()

// 上传成功回调
const uploadSuccess = () => {
    
}

// 上传前校验
const beforeUpload = () => {

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
  width: 40%;
  top: 20vh;
}

.register_form {
    color: rgba(0, 0, 0, 0.75);
    justify-content: center;
    display: flex;

    .avatar_uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;

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
}
</style>