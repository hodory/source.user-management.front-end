<template>
    <div>
        <div v-if="!isAuthenticated">
            <h2>Login</h2>
            <form @submit.prevent="onSubmit(email, password)">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="email"  v-model="email" placeholder="Email Address">
                        <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
                        <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="password" v-model="password" placeholder="Password">
                        <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
                    </p>
                </div>
                <div>{{msg}}</div>
                <div class="field">
                    <p class="control">
                        <button type="submit" class="button is-success">
                            Login
                        </button>
                    </p>
                </div>
            </form>
        </div>
        <router-link to="/user/list" v-else>회원 목록</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
                msg: ''
            }
        },
        props: [
            'isAuthenticated'
        ],
        methods: {
            onSubmit(email, password) {

                // LOGIN 액션 실행
                this.$store.dispatch('LOGIN', {email, password})
                    .then(() => this.redirect())
                    .catch((e) => {
                        if (e.toString()) {
                            this.msg = e.toString();
                        }else if (!e.response) {
                            this.redirect()
                        } else {
                            this.statusCode = e.response.data.statusCode;
                            this.msg = e.response.data.message;
                        }
                    })
            },
            redirect() {
                const {search} = window.location;
                const tokens = search.replace(/^\?/, '').split('&');
                const {returnPath} = tokens.reduce((qs, tkn) => {
                    const pair = tkn.split('=');
                    qs[pair[0]] = decodeURIComponent(pair[1]);
                    return qs
                }, {});

                // 리다이렉트 처리
                this.$router.push(returnPath || '/user/list')
            }
        }
    }
</script>
