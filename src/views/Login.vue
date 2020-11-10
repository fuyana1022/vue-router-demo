<template>
    <div class="login">
        <button @click="handleClick">
            {{ bynText }}
        </button>
    </div>
</template>

<script>
import auth from '../util/auth';
export default {
    data(){
        return {
            isLogin : auth.isLogin(),
        }
    },
    computed: {
        bynText(){
            return this.isLogin ? "取消登录" : "登录";
        }
    },
    methods: {
        handleClick(){
            if(this.isLogin){
                auth.cancelLogin();
            }else{
                auth.login();
                this.goBack();
            }
            this.isLogin = !this.isLogin;
        },
        goBack(){
            const isGoBack = window.confirm('登录成功，是否返回之前的页面？');
            if(isGoBack){
                this.$router.go(-1);
            }
        }
    }
}
</script>