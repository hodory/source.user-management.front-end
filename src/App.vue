<template>
    <div id="app" class="container">
        <a href="" v-if="isAuthenticated" @click.prevent="onClickLogout">Logout</a>
        <router-view v-bind:isAuthenticated="isAuthenticated"></router-view>
    </div>
</template>

<script>
    import store from './store';

    export default {
        name: 'app',
        computed: {
            isAuthenticated() {
                return store.state.accessToken !== null || localStorage.getItem('user-management.accesstoken') ? true : false;
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
