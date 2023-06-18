<template>
  <div class="login">
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">买吧管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix
            ><svg-icon icon-class="user" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix
            ><svg-icon icon-class="password" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >我已阅读并同意「用户协议」和「隐私条款」</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%;"
          class="login-btn"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 爷的</span>
    </div>
  </div>
</template>

<script setup>
// import Cookies from 'js-cookie';
// import { encrypt, decrypt } from '@/utils/jsencrypt';
import useUserStore from '@/store/modules/user';
////////////////////////////////////////////////////////////////
const userStore = useUserStore();
const router = useRouter();
// 获取当前组件实例
const { proxy } = getCurrentInstance();
////////////////////////////////////////////////////////////////
// 表单数据
// TODO: 将来这里要修改为自己的表单字段
const loginForm = ref({
  username: 'admin',
  password: 'admin888',
});
// 验证规则对象
// TODO: 将来这里要修改为自己的验证规则
const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
};
const loading = ref(false);
const redirect = ref(undefined);
// 登录逻辑
async function handleLogin() {
  // 表单校验
  await proxy.$refs.loginRef.validate();
  // 节流处理
  loading.value = true;
  // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
  // if (loginForm.value.rememberMe) {
  //   Cookies.set('username', loginForm.value.username, { expires: 30 });
  //   // 如果记住密码在本地，需要将密码进行加密
  //   Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 });
  //   Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 });
  // } else {
  //   // 否则移除
  //   Cookies.remove('username');
  //   Cookies.remove('password');
  //   Cookies.remove('rememberMe');
  // }
  // 调用user模块的登录页的action的登录方法
  try {
    // 视图层[login.vue] ==> 状态层[pinia中 user模块]
    await userStore.login(loginForm.value);
    router.push({ path: redirect.value || '/' });
  } catch (error) {
    loading.value = false;
  }
}
// //  【回显本地的账号信息】
// function getCookie() {
//   const username = Cookies.get('username');
//   const password = Cookies.get('password');
//   const rememberMe = Cookies.get('rememberMe');
//   // 初始赋值
//   loginForm.value = {
//     username: username === undefined ? loginForm.value.username : username,
//     // password 要做解密操作
//     password:
//       password === undefined ? loginForm.value.password : decrypt(password),
//     rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
//   };
// }
// // 页面打开就执行
// getCookie();
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}
.title {
 margin-bottom: 15px;
  text-align: center;
  font-size: 30px;
  color: #1890ff;
  line-height: 40px;
}

.login-form {
  // border-radius: 6px;
  background: hsla(0,0%,100%,.5);
  width: 400px;
  padding: 30px 40px 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-btn {
  span {
    font-size: 16px;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
