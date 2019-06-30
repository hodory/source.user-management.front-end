<template>
    <div id="app" class="container">
        <UserList v-bind:end-point="endPoint"></UserList>
    </div>
</template>

<script>
    import UserList from './components/UserList.vue';

    export default {
        name: 'app',
        data: function () {
            return {
                endPoint: `https://hodory-user-management.herokuapp.com`
            };
        },
        components: {
            UserList,
        }
    }
</script>

<style lang="sass">
    @import '~bulma'
</style>
