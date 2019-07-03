<template>
    <div>
        <div class="field is-grouped" v-if="isEditable">
            <div class="control" @click="_onClickInsert">
                <button class="button is-link">회원 등록</button>
            </div>
        </div>
        <div v-if="isUserExists">
            <UserCard v-for="(user, key) in users" v-bind:user="user" :key="key"
                      @click.native="_onClick(key)"></UserCard>
        </div>
        <div class="modal" v-bind:class="{'is-active': isOpenModal}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">회원 {{_statusText}}</p>
                    <button class="delete" aria-label="close" @click="_changeModalStatus(false)"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">회원 ID</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="email" placeholder="email" v-model.trim="this.selectedUser.userId"
                                   :readonly="isUpdate || !_isEditable">
                            <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
                            <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
                        </div>
                    </div>

                    <template v-if="!isUpdate">
                        <div class="field">
                            <label class="label">패스워드</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="password" placeholder="Password" v-model="password">
                                <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
                                <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
                            </div>
                        </div>
                    </template>

                    <div class="field">
                        <label class="label">회원명</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Username" v-model.trim="this.selectedUser.name" :readonly="!_isEditable">
                            <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">등급</label>
                        <div class="control">
                            <p v-if="_isMaster" class="is-success">Master</p>
                            <p v-else-if="!_isEditable" class="is-success">{{levels[selectedUser.level]}}</p>
                            <div class="select" v-else>
                                <select v-model.number="selectedUser.level">
                                    <option
                                            v-for="(_level,_key) in levels" v-bind:key="_key" v-bind:value="_key" v-if="_key < loginUser.level">
                                        {{_level}}

                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field is-grouped" v-if="_isEditable">
                        <div class="control" @click="_onSubmit()">
                            <button class="button is-link">{{_statusText}}</button>
                        </div>
                        <div class="control" @click="_changeModalStatus(false)">
                            <button class="button is-text">취소</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import UserCard from "./UserCard.vue";
    import * as axios from 'axios';

    export default {
        name: "UserList",
        components: {UserCard},
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
                loginUser: {
                    level : 0
                },
                levels: {
                    1: "Bronze",
                    2: "Silver",
                    3: "Gold",
                    4: "Platinum",
                    5: "Diamond"
                },
                password: null,
            };
        },
        methods: {
            _onClick(key) {
                this.selectedUser = Object.assign({},this.users[key]);
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
            },
            _authMe() {
                axios.get(`${this.endPoint}/v1/auth/me`).then(
                    (res) => {
                        const {data} = res.data;
                        this.loginUser = data;
                    },
                    (error) => {
                        alert(`로그인 정보 조회에 오류가 발생했습니다.${error.response.data.message}`);
                    }
                );
            },
            async _onSubmit() {
                // TODO : 회원 등록 / 수정시 리렌더링 처리
                if(!this._isEditable()) {
                    return false;
                }
                // userID 리턴받도록 수정
                if (this.isUpdate) {
                    try {
                        const updateResponse = await axios.patch(`https://hodory-user-management.herokuapp.com/v1/users/2`, {
                            "id": this.selectedUser.userId,
                            "name": this.selectedUser.name,
                            "level": this.selectedUser.level
                        });
                        this._refresh();
                    } catch (e) {
                        alert(e.response.data.message);
                    }
                } else {
                    try {
                        const createResponse = await axios.post(`https://hodory-user-management.herokuapp.com/v1/users`, {
                            "id": this.selectedUser.userId,
                            "password": this.password,
                            "name": this.selectedUser.name,
                            "level": this.selectedUser.level
                        });
                        this._refresh();
                    } catch (e) {
                        alert(e.response.data.message);
                    }
                }
            }
        },
        mounted() {
            this._authMe();
            this._getUsers();
        },
        computed: {
            isUserExists() {
                return this.users.length > 0;
            },
            isEditable(){
                return this.loginUser && this.loginUser.level > 4;
            },
            _statusText() {
                return (this.isUpdate) ? "수정" : "등록";
            },
            _isMaster() {
                return this.selectedUser.level === 99;
            },
            _isEditable() {
                return this.isEditable && this.loginUser.level > this.selectedUser.level;
            }
        },
    }
</script>

<style scoped>

</style>
