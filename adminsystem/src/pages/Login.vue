<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-logo">
        <img src="../assets/logo.png" />
        <span class="ms-title">后台管理系统</span>
      </div>
      <div class="ms-form">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item
            prop="account">
            <el-input v-model="form.account" placeholder="请输入邮箱地址" autocomplete="off">
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="password" >
            <el-input v-model="form.password" type="password" placeholder="请输入密码" >
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-checkbox ><p class="login-tips">已阅读并同意《用户协议》《隐私政策》</p></el-checkbox>
          <div>
            <el-button  class="login-btn" type="primary" @click="submitForm()">登录</el-button>
            <el-button class="register-btn" type="text" @click="registerAction()">新用户注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script >
export default {
  data (){
    // 验证手机号
    const validatePhone = (rule, value, callback) => {
      const regex = /^1[3-9]\d{9}$/
      if (value && !regex.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }

    // 验证邮箱
    const validateEmail = (rule, value, callback) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !regex.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()
      }
    }
    // 合并验证手机号码或邮箱地址
    const validatePhoneOrEmail = (rule, value, callback) => {
      const phoneRegex = /^1[3-9]\d{9}$/
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value) {
        return callback(new Error('请输入手机号或邮箱'))
      }
      setTimeout(() => {
        if (!phoneRegex.test(value) && !emailRegex.test(value)) {
          callback(new Error('请输入正确的手机号或邮箱格式'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      form: {
        account:'',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入手机号或邮箱', trigger: 'blur' },
          { validator: validatePhoneOrEmail, trigger: ['blur'] }
        ],
        password: [
          //{ required: true, message: '请输入手机号或邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    submitForm() {
        this.$router.push({
          path: '/dashboard'
        })
    },
    registerAction() {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /*background-color: #324157;*/
  background-image: url("../assets/images/bg.png");
}

.ms-login {
  position: absolute;
  left:60%;
  background-color: rgba(256,256,256,0.7);
  height: 100%;
  width: 40%;
  align-items: center;
}

.ms-logo {
  position: absolute;
  display: flex;
  width: 100%;
  top: 10%;
  left: 10%;
  right: 10%;
  align-items: center;
}

.ms-logo img {
  width: 70px;
  height: 70px;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  color: #000;
  font-size: 24px;
  padding-left: 30px;
}

.ms-form {
  position: absolute;
  left: 20%;
  top: 30%;
  right: 20%;
  align-items: center;
}

.ms-form el-input {
  height: 100px;
}

.login-btn {
  text-align: center;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  background-color: mediumseagreen;
  border-color: mediumseagreen;
}

.register-btn {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  color: #ff0000;
}

.login-tips {
  font-size: 13px;
  line-height: 30px;
  color: #000000;
}

.register-btn {
  font-size: 13px;
}
</style>
