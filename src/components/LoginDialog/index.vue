<script lang="ts" setup>
import { ref, watch } from 'vue';
import logoPng from '@/assets/images/logo.png';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useUserStore } from '@/stores';
import { useLoginFormStore } from '@/stores/modules/loginForm';
import AccountPassword from './components/FormLogin/AccountPassword.vue';
import RegistrationForm from './components/FormLogin/RegistrationForm.vue';
import QrCodeLogin from './components/QrCodeLogin/index.vue';

const userStore = useUserStore();
const loginFromStore = useLoginFormStore();

const loginFormType = computed(() => loginFromStore.LoginFormType);

// 使用 defineModel 定义双向绑定的 visible（需 Vue 3.4+）
const visible = defineModel<boolean>('visible');
const showMask = ref(false); // 控制遮罩层显示的独立状态
const isQrMode = ref(false);

// 监听 visible 变化，控制遮罩层显示时机
watch(
  visible,
  (newVal) => {
    if (newVal) {
      // 恢复默认
      isQrMode.value = false;
      // 显示时立即展示遮罩
      showMask.value = true;
    }
  },
  { immediate: true },
);

// 切换二维码登录
function toggleLoginMode() {
  isQrMode.value = !isQrMode.value;
}

// 点击遮罩层关闭对话框（触发过渡动画）
function handleMaskClick() {
  // 触发离开动画
  userStore.closeLoginDialog();
}

// 过渡动画结束回调
function onAfterLeave() {
  if (!visible.value) {
    showMask.value = false; // 动画结束后隐藏遮罩
  }
}
</script>

<template>
  <!-- 使用 Teleport 将内容传送至 body -->
  <Teleport to="body">
    <div v-show="showMask" class="mask" @click.self="handleMaskClick">
      <!-- 仅对弹框应用过渡动画 -->
      <Transition name="dialog-zoom" @after-leave="onAfterLeave">
        <div v-show="visible" class="glass-dialog">
          <div class="left-section">
            <div class="logo-wrap">
              <img :src="logoPng" class="logo-img">
              <span class="logo-text">Element Plus X</span>
            </div>
            <div class="ad-banner">
              <SvgIcon name="p-bangong" class-name="animate-up-down" />
            </div>
          </div>
          <div class="right-section">
            <div class="mode-toggle" @click.stop="toggleLoginMode">
              <SvgIcon v-if="!isQrMode" name="erweimadenglu" />
              <SvgIcon v-else name="zhanghaodenglu" />
            </div>
            <div class="content-wrapper">
              <div v-if="!isQrMode" class="form-box">
                <!-- 表单容器，父组件可以自定定义表单插槽 -->
                <slot name="form">
                  <!-- 父组件不用插槽则显示默认表单 默认使用 AccountPassword 组件 -->
                  <div v-if="loginFormType === 'AccountPassword'" class="form-container">
                    <span class="content-title"> 登录后免费使用完整功能 </span>

                    <el-divider content-position="center">
                      账号密码登录
                    </el-divider>

                    <AccountPassword />
                  </div>

                  <div v-if="loginFormType === 'RegistrationForm'" class="form-container">
                    <span class="content-title"> 登录后免费使用完整功能 </span>

                    <el-divider content-position="center">
                      邮箱注册账号
                    </el-divider>

                    <RegistrationForm />
                  </div>
                </slot>
              </div>
              <div v-else class="qr-container">
                <QrCodeLogin />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
/* 动画样式（仅作用于弹框） */
.dialog-zoom-enter-active,
.dialog-zoom-leave-active {
  transform-origin: center;
  transition: all 0.3s ease-in-out;
}
.dialog-zoom-enter-from,
.dialog-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-zoom-enter-to,
.dialog-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* 遮罩层样式 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  background-color: rgb(0 0 0 / 50%);
  opacity: 1;
  backdrop-filter: blur(3px);
  transition: opacity 0.3s;
}
.mask[hidden] {
  opacity: 0;
}

/* 对话框容器样式 */
.glass-dialog {
  z-index: 1000;
  display: flex;
  width: fit-content;
  max-width: 90%;
  height: var(--login-dialog-height);
  padding: var(--login-dialog-padding);
  overflow: hidden;
  background-color: #ffffff;
  border-radius: var(--login-dialog-border-radius);
  box-shadow: 0 4px 24px rgb(0 0 0 / 10%);
}

/* 以下样式与原代码一致，未修改 */
.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(var(--login-dialog-width) / 2);
  padding: var(--login-dialog-section-padding);
  background: linear-gradient(
    233deg,
    rgb(113 161 255 / 60%) 17.67%,
    rgb(154 219 255 / 60%) 70.4%
  );
}
.left-section .logo-wrap {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
.left-section .logo-wrap .logo-img {
  width: 40px;
  height: 40px;
  padding: 4px;
  background: var(--login-dialog-logo-background);
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 8%);
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 10%));
}
.left-section .logo-wrap .logo-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--login-dialog-logo-text-color);
}
.left-section .ad-banner {
  position: relative;
  width: 100%;
  height: 100%;
}
.left-section .ad-banner .svg-icon {
  position: absolute;
  width: 100%;
  height: 310px;
}
.right-section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(var(--login-dialog-width) / 2);
  padding: var(--login-dialog-section-padding);
}
.right-section .content-wrapper {
  flex: 1;
  padding: 8px 0;
  overflow: hidden;
}
.right-section .content-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
}
.right-section .mode-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  color: var(--login-dialog-mode-toggle-color);
  cursor: pointer;
  transition: color 0.3s;
}
.right-section .form-container,
.right-section .qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.right-section .form-box {
  place-self: center center;
  width: 260px;
  height: 100%;
  padding: var(--login-dialog-section-padding);
  border-radius: var(--login-dialog-border-radius);
}

@media (width <= 800px) {
  .left-section {
    display: none !important;
  }
  .glass-dialog {
    height: var(--login-dialog-height);
    padding: var(--login-dialog-padding);
  }
  .right-section {
    padding: calc(var(--login-dialog-section-padding) - 8px);
  }
  .content-wrapper {
    padding: 4px 0;
  }
}
.animate-up-down {
  animation: up-down 5s linear 0ms infinite;
}

@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
