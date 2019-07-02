<template>
    <div>
        <div class="field is-grouped">
            <div class="control" @click="_onClickInsert">
                <button class="button is-link">회원 등록</button>
            </div>
        </div>
        <div v-if="isUserExists">
            <UserCard v-for="(user, key) in users" v-bind:user="user" :key="key"
                      @click.native="_onClick(key)"></UserCard>
            <UserModal v-bind:userId.sync="selectedUser.userId"
                       v-bind:userName.sync="selectedUser.name"
                       v-bind:user-level.sync="selectedUser.level"
                       v-bind:isOpen="isOpenModal"
                       v-bind:isUpdate="isUpdate"
                       v-bind:changeModalStatus="_changeModalStatus"
                       v-bind:refresh-list="_refresh"></UserModal>
        </div>
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
                selectedUser: {
                    level: 1,
                    name: null,
                    updatedAt: null,
                    userId: null
                },
                isUpdate: false,
                isOpenModal: false,
                endPoint: `https://hodory-user-management.herokuapp.com`,
            };
        },
        methods: {
            _onClick(key) {
                this.selectedUser = this.users[key];
                this.isUpdate = true;
                this._changeModalStatus(true);
            },
            _changeModalStatus(status) {
                if (!status) {
                    this.isUpdate = false;
                    this._resetSelectedUser();
                }
                this.isOpenModal = status;
            },
            _onClickInsert() {
                this.isUpdate = false;
                this._resetSelectedUser();
                this.isOpenModal = true;
            },
            _resetSelectedUser() {
                this.selectedUser = {
                    level: 1,
                    name: null,
                    updatedAt: null,
                    userId: null
                }
            },
            _refresh() {
                this._changeModalStatus(false);
                this._resetSelectedUser();
                this._getUsers();
            },
            _getUsers() {
                axios.get(`${this.endPoint}/v1/users/list`).then(
                    (res) => {
                        const {data} = res.data;
                        this.users = data.userList;
                    },
                    (error) => {
                        alert(`데이터 조회에 오류가 발생했습니다.${error.response.data.message}`);
                    }
                );
            }
        },
        mounted() {
            this._getUsers();
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
