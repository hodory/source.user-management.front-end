<template>
    <div v-if="isUserExists">
        <UserCard v-for="(user, key) in users" v-bind:user="user" :key="key" @click.native="_onClick(key)"></UserCard>
        <UserModal v-bind:user="selectedUser" v-bind:isOpen="isOpenModal"
                   v-bind:changeModalStatus="_changeModalStatus"></UserModal>
    </div>
</template>

<script>
    import UserCard from "./UserCard.vue";
    import * as axios from 'axios';
    import UserModal from "./UserModal";

    export default {
        name: "UserList",
        components: {UserModal, UserCard},
        data: function () {
            return {
                users: [],
                selectedUser: {},
                isOpenModal: false,
                endPoint: `https://hodory-user-management.herokuapp.com`,
            };
        },
        methods: {
            _onClick(key) {
                this.selectedUser = this.users[key];
                this._changeModalStatus(true);
            },
            _changeModalStatus(status) {
                if (!status) {
                    this.isOpenModal = status;
                }
                this.selectedUser = false;
            }
        },
        mounted() {
            axios.get(`${this.endPoint}/v1/users/list`).then(
                (res) => {
                    const {data} = res.data;
                    this.users = data.userList;
                },
                (error) => {
                    console.error(error.toLocaleString());
                    alert(`데이터 조회에 오류가 발생했습니다.`);
                }
            );
        },
        computed: {
            isUserExists() {
                return this.users.length > 0;
            }
        },
    }
</script>

<style scoped>

</style>
