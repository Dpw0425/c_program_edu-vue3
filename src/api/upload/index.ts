import request from '@/utils/request'
import type { uploadAvatarForm, uploadAvatarResponse } from './type'

const UPLOAD_API = '/upload'

enum API {
  UPLOAD_AVATAR_API = UPLOAD_API + '/avatar',
}

export const reqUploadAvatar = (data: uploadAvatarForm) => {
  const formData = new FormData()
  formData.append('avatar', data.avatar)

  return request.post<any, uploadAvatarResponse>(
    API.UPLOAD_AVATAR_API,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
