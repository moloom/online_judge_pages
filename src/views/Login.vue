<template>
  <div class="body">
    <div class="container">
      <div class="form-box" :class="classObj">
        <!-- 注册 -->
        <div class="register-box" v-show="isDisplay[0]">
          <h1>register</h1>
          <input type="text" placeholder="用户名" v-model="rName">
          <input type="email" placeholder="邮箱" v-model="email">
          <input type="password" placeholder="密码" v-model="rPassword">
          <input type="password" placeholder="确认密码" v-model="checkPassword">
          <button @click="register">注册</button>
        </div>
        <!-- 登录 -->
        <div class="login-box" v-show="isDisplay[1]">
          <h1>login</h1>
          <input type="text" placeholder="用户名" v-model="lName">
          <input type="password" placeholder="密码" v-model="lPassword">
          <button @click="login">登录</button>
          <button @click="clearLoginInfo">重置</button>
          <br>
          <el-link type="info" @click="toRetrievePassword">忘记密码啦？</el-link>
        </div>
        <!--  找回密码  -->
        <div class="login-box" v-show="isDisplay[2]">
          <h1>retrieve</h1>
          <input type="text" placeholder="用户名" v-model="retrieveName">
          <input type="email" placeholder="邮箱" v-model="retrieveEmail">
          <input type="password" placeholder="邮箱验证码" v-model="verifyCode">
          <input type="password" placeholder="新密码" v-model="newPassword">
          <button @click="retrievePassword">修改密码</button>
          <br>
          <el-link type="info" @click="toLogin">想起密码啦？</el-link>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到<span>MOJ</span></h2>
        <p>快点<span>登录</span>吧</p>
        <img src="@/assets/xiaohei_4.gif" alt="">
        <p>已有帐号</p>
        <button @click="toLogin">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>MOJ</span></h2>
        <p v-show="isLogin">{{loginMsg}}</p>
        <p v-show="!isLogin">{{retrieveMsg}}</p>
        <img src="@/assets/xiaohei_3.gif" alt="">
        <p>没有帐号</p>
        <button @click="toRegister">去注册</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      //注册信息
      rName: "",
      email: "",
      rPassword: "",
      checkPassword: "",
      //登录信息
      lName: "",
      lPassword: "",
      loginMsg: "快点康康吧",
      isLogin: true,
      //找回密码信息
      retrieveName: "",
      retrieveEmail: "",
      verifyCode: "",
      newPassword: "",
      retrieveMsg:"输完邮箱后回车会自动发送邮箱验证码哦~",
      //样式相关
      isDisplay: [false, true, false],
      classObj: {
        transformRegister: false,
        transformLogin: false,
      },
    }
  },
  methods: {
    clearLoginInfo() {
      // 重置登录信息
      this.lName = "";
      this.lPassword = "";
    },
    toRegister() {
      //去注册，移动方块
      this.classObj.transformLogin = false;
      this.classObj.transformRegister = true;
      this.isDisplay.splice(0, 3, true, false, false);
    },
    toLogin() {
      //去登录，移动方块
      this.classObj.transformLogin = true;
      this.classObj.transformRegister = false;
      this.isDisplay.splice(0, 3, false, true, false);
      this.isLogin = true;
    },
    toRetrievePassword() {
      //使用数组的方法，让vue可以检测到数组变化，从而重新解析模板。
      this.isDisplay.splice(0, 3, false, false, true);
      this.isLogin = !this.isLogin;
    },
    retrievePassword() {
      console.log("retrievePassword");
    },
    register() {
      console.log("register");
    },
    login() {
      console.log("login");
    },
  },
}
</script>

<style scoped>
* {
  /* 全局配置 */
  margin: 0;
  padding: 0;
}

.transformRegister {
  transform: translateX(80%);
}

.transformLogin {
  transform: translateX(0%);
}

.body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #f3e7e9, #e3eeff);
}

.container {
  background-color: #fff;
  width: 650px;
  height: 415px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0);
  position: relative;
  /* margin: 0 auto;  水平居中 */
}

.form-box {
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #d3b7d8;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hidden {
  display: none;
  transition: 0.5s;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  /* 字间距 */
  letter-spacing: 5px;
}

input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  /* 下边框样式 */
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

input::placeholder {
  color: #fff;
}

input:focus {
  color: #a262ad;
  outline: none;
  border-bottom: 1px solid #a262ad80;
  transition: 0.5s;
}

input:focus::placeholder {
  opacity: 0;
}

.form-box button {
  width: 70%;
  margin-top: 35px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #a262ad;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}

.form-box button:hover {
  background-color: #a262ad;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}

.con-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.con-box.left {
  left: -2%;
}

.con-box.right {
  right: -2%;
}

.con-box h2 {
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}

.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}

.con-box span {
  color: #d3b7d8;
}

.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}

.con-box button {
  margin-top: 3%;
  background-color: #fff;
  color: #a262ad;
  border: 1px solid #d3b7d8;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}

.con-box button:hover {
  background-color: #d3b7d8;
  color: #fff;
}

</style>