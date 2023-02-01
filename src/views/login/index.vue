<template>
  <div class="login-page">
    <div class="main-bg"></div>
    <div class="login-container">
      <div class="title-container">
        <h3 class="title">{{ '用户登录' }}</h3>
      </div>
      <n-form ref="loginFromRef" class="login-form" :model="loginFrom" :rules="loginRules">
        <n-form-item path="username">
          <span class="svg-container">
            <i class="iconfont icon-user"></i>
          </span>
          <n-input v-model:value="loginFrom.account" :bordered="false" name="username" type="text">
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <span class="svg-container">
            <i class="iconfont icon-password"></i>
          </span>
          <n-input
            v-model:value="loginFrom.password"
            :bordered="false"
            name="password"
            :type="passwordShow ? 'text' : 'password'"
          >
          </n-input>
          <span class="show-pwd" @click="onChangePasswordShow">
            <i class="iconfont" :class="passwordShow ? 'icon-view' : 'icon-view-off'"></i>
          </span>
        </n-form-item>
        <n-button :bordered="false" :loading="loading" @click="handleLogin">{{ '登录' }}</n-button>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from '@/store'
  import type { FormInst } from 'naive-ui'

  const loginFrom = ref({
    account: 'admin',
    password: '123456',
    verifyCode: ''
  })

  const loginRules = {
    account: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    password: {
      required: true,
      message: '密码应大于六位',
      trigger: 'blur',
      min: 6
    }
  }

  const passwordShow = ref(false)
  const onChangePasswordShow = () => {
    passwordShow.value = !passwordShow.value
  }
  const message = useMessage()
  const loading = ref(false)
  const loginFromRef = ref<FormInst | null>(null)
  const router = useRouter()
  const { User } = useStore()
  const handleLogin = (e: MouseEvent) => {
    // 进行表单校验
    e.preventDefault()
    loginFromRef.value?.validate((errors) => {
      loading.value = true
      if (!errors) {
        User.login(loginFrom.value)
          .then(() => {
            router.push({ path: '/admin' })
          })
          .catch((err) => {
            return Error(err)
          })
      } else {
        window.$message.warning(JSON.stringify(errors))
      }
      loading.value = false
    })
  }
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';

  .login-page {
    height: 100%;

    .main-bg {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-image: $BgImage;
      transition: 0.5 all;
    }

    .login-container {
      position: relative;
      width: 4.2rem;
      min-height: 100%;
      top: 0;
      display: flex;
      margin-left: 5%;
      flex-direction: column;
      box-shadow: rgba(0, 0, 0, 0.75) 0 0 0.35rem -0.05rem;
      backdrop-filter: $BgFilter; // 模糊遮罩
      background-color: $loginBlurColor;

      .title-container {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        margin: 0.5rem auto 1rem 0.5rem;

        .title {
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.2rem;
          color: $loginTextColor;
          font-weight: 700;
          font-family: 'TypoGraphica';
        }
      }

      .login-form {
        width: 100%;
        padding: 0.2rem 0.5rem;

        :deep(.n-form-item) {
          display: block;
          margin: 0.14rem 0;

          .n-form-item-feedback-wrapper {
            padding-top: 5px;
            padding-left: 0.48rem;
          }

          .n-input {
            background-color: transparent;

            .n-input-wrapper {
              box-shadow: none;
              padding: 0;

              .n-input__input {
                height: 0.4rem;
                font-size: 0.16rem;
                padding: 0.08rem 0.48rem;
                box-sizing: border-box;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                color: $loginTextColor;
                border-bottom: $loginTextColor 0.01rem solid;

                .n-input__input-el {
                  height: auto;
                  line-height: normal;
                  color: $loginTextColor;
                }
                .n-input__placeholder {
                  display: none;
                }
              }

              .el-input__suffix {
                height: 1px;
                position: absolute;
                width: 100%;
                bottom: 0;
                border-bottom: 1px $loginSuffixColor solid;
                transform: scaleX(0);
                transition: transform 0.3s;
              }
            }

            .is-focus {
              .el-input__suffix {
                transform: none;
              }
            }
          }

          .show-pwd,
          .svg-container {
            position: absolute;
            text-transform: none;
            line-height: 1;
            color: $loginTextColor;
            font-size: 0.24rem;
          }

          .svg-container {
            left: 0.1rem;
          }

          .show-pwd {
            right: 0.1rem;
          }
        }

        .n-button {
          width: 100%;
          box-shadow: rgba(0, 0, 0, 0.1) 0 0 0.5rem 0;
          font-weight: 500;
          font-size: 0.15rem;
          color: $loginTextColor;
          text-align: center;
          cursor: pointer;
          min-height: 0.5rem;
          background-color: $loginButtonColor;
          border-radius: 0.06rem;
          outline: none;
          border-style: none;
          padding: 0.1rem 0;
          margin: 0.3rem 0 1rem;
          transition: all 0.3s;
          letter-spacing: 0.128rem;
        }
      }
    }
  }
  .iconfont {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    vertical-align: -0.15em;
    font-size: 1em;
  }
</style>
