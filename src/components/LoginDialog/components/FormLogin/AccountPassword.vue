<!-- 账号密码登录表单 -->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import type { LoginDTO } from '@/api/auth/types';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api';
import { useUserStore } from '@/stores';
import { useSessionStore } from '@/stores/modules/session';

const userStore = useUserStore();
const sessionStore = useSessionStore();

const formRef = ref<FormInstance>();

const formModel = reactive<LoginDTO>({
  username: '',
  password: '',
});

const rules = reactive<FormRules<LoginDTO>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const router = useRouter();
async function handleSubmit() {
  try {
    await formRef.value?.validate();
    const res = await login(formModel);
    console.log(res, 'res');
    res.data.token && userStore.setToken(res.data.token);
    res.data.userInfo && userStore.setUserInfo(res.data.userInfo);
    ElMessage.success('登录成功');
    userStore.closeLoginDialog();
    // 立刻获取回话列表
    await sessionStore.requestSessionList(1, true);
    router.replace('/');
  }
  catch (error) {
    console.error('请求错误:', error);
  }
}
</script>

<template>
  <div class="custom-form">
    <el-form ref="formRef" :model="formModel" :rules="rules" style="width: 230px">
      <el-form-item prop="username">
        <el-input v-model="formModel.username" placeholder="请输入用户名" clearable>
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          placeholder="请输入密码"
          clearable
          type="password"
          show-password
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="handleSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-btn {
  margin-top: 24px;
  padding: 12px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
