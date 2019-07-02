<template>
    <div id="app" class="container">
        <a href="" v-if="isAuthenticated" @click.prevent="onClickLogout">Logout</a>
        <router-link to="/login" v-else>Login</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    import store from './store';

    export default {
        name: 'app',
        computed: {
            isAuthenticated() {
                return localStorage.getItem('user-management.accesstoken') ? true : false;
            }
        },
        methods: {
            onClickLogout() {
                // LOGOUT 변이 실행 후 리다이렉트
                store.dispatch('LOGOUT').then(() => this.$router.push('/'))
            }
        }
    }
</script>

<style lang="sass">
    @import '~bulma'
</style>
