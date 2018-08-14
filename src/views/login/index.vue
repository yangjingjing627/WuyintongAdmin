<template>
  <div class="login-container">
    <div class="login-box">
      <div class="left-area">

      </div>
      <div class="right-area">
        <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <h3 class="title">登录</h3>
          <h4>账号</h4>
          <el-form-item prop="name">
            <el-input name="name" type="text" v-model="loginForm.name" autoComplete="on" placeholder="手机号" />
          </el-form-item>
          <h4>密码</h4>
          <el-form-item prop="passwd">
            <el-input name="passwd" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.passwd" autoComplete="on"
              placeholder="密码" />
            <span class='show-pwd' @click='showPwd'><icon-svg icon-class="eye" /></span>
          </el-form-item>
          <div class="forget">
            <span>忘记密码？</span>
          </div>
          <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          <input type="hidden" name="organizationId" v-model="loginForm.organizationId">
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        organizationId: 1,
        name: '18301380329',
        passwd: '123456'
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        passwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.replace({ path: '/' })
                // this.showDialog = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
          // const hash = window.location.hash.slice(1)
          // const hashObj = getQueryObject(hash)
          // const originUrl = window.location.origin
          // history.replaceState({}, '', originUrl)
          // const codeMap = {
          //   wechat: 'code',
          //   tencent: 'code'
          // }
          // const codeName = hashObj[codeMap[this.auth_type]]
          // if (!codeName) {
          //   alert('第三方登录失败')
          // } else {
          //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
          //     this.$router.push({ path: '/' })
          //   })
          // }
    }
  },
  created() {
        // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $iconImgUrl:'../../../src/assets';

  .login-container {
    @include relative;
    height: 100vh;
    background: url(#{$iconImgUrl}/login/bg.png) center center no-repeat #000;
    // input:-webkit-autofill {
    //   -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    //   -webkit-text-fill-color: #fff !important;
    // }
    .login-box{
      width: 824px;
      height: 460px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -421px;
      margin-top: -230px;
      display: flex;
      .left-area{
        width: 412px;
        height: 460px;
        background: url(#{$iconImgUrl}/login/login-bg.png) 0 0 no-repeat;
      }
      .right-area{
        width: 412px;
        padding: 26px 62px 0 40px;
        background: #fff;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          height: 47px;
        }
        .el-input {
          display: inline-block;
          height: 47px;
          width: 85%;
        }
        .tips {
          font-size: 14px;
          color: #fff;
          margin-bottom: 10px;
        }
        .title {
          font-size: 24px;
          color: #333333;
          line-height: 33px;
          margin: 0;
          padding-bottom: 10px;
        }
        h4{
          margin-bottom: 6px;
          margin-top: 20px;
          font-size: 14px;
          color: #AEBAC7;
          font-weight: normal;
        }
        .forget{
          text-align: right;
          font-size: 14px;
          color: #AEBAC7; 
          margin-top: 10px;
        }
        .el-form-item {
          margin: 0;
          border: 1px solid #EEEEEE;
          background: #fff;
          color: #454545;
        }
        .show-pwd {
          position: absolute;
          right: 10px;
          top: 7px;
          font-size: 16px;
          color: #ccc;
          cursor: pointer;
        }
        .el-button{
          background: linear-gradient(-90deg, #EA5642 3%, #E13D88 100%);
          border: none;
          height: 44px;
          line-height: 44px;
          padding: 0;
          width: 100%;
          margin-top: 85px;
          span{
            height: 44px;
            line-height: 44px;
          }
        }
      }
    }
    
  }
</style>
