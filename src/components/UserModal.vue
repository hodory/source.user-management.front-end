<template>
    <div class="modal" v-bind:class="{'is-active': isOpen}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">회원 {{_statusText}}</p>
                <button class="delete" aria-label="close" @click="changeModalStatus(false)"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">회원 ID</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="email" v-model.trim="userId"
                               :readonly="isUpdate">
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
                        <input class="input" type="text" placeholder="Username" v-model.trim="userName">
                        <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">등급</label>
                    <div class="control">
                        <p v-if="_isMaster" class="is-success">Master</p>
                        <div class="select" v-else>
                            <select v-model.number="userLevel">
                                <option
                                        v-for="(_level,_key) in levels" v-bind:key="_key" v-bind:value="_key">
                                    {{_level}}

                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control" @click="_onSubmit()">
                        <button class="button is-link">{{_statusText}}</button>
                    </div>
                    <div class="control" @click="changeModalStatus(false)">
                        <button class="button is-text">취소</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "UserModal",
        props: [
            'userId',
            'userName',
            'userLevel',
            'isUpdate',
            'isOpen',
            'changeModalStatus',
            'refreshList',
        ],
        data: function () {
            return {
                levels: {
                    1: "Bronze",
                    2: "Silver",
                    3: "Gold",
                    4: "Platinum",
                    5: "Diamond"
                },
                password: null,
            }
        },
        computed: {
            _statusText() {
                return (this.isUpdate) ? "수정" : "등록";
            },
            _isMaster() {
                return this.userLevel === 99;
            },
        },
        methods: {
            async _onSubmit() {
                // TODO : 회원 등록 / 수정시 리렌더링 처리 및 하위컴포넌트화 하지않고 동일컴포넌트로 옮기는 것 검토
                // userID 리턴받도록 수정
                if (this.isUpdate) {
                    try {
                        const updateResponse = await axios.patch(`https://hodory-user-management.herokuapp.com/v1/users/2`, {
                            "id": this.userId,
                            "name": this.userName,
                            "level": this.userLevel
                        });
                        this.refreshList();
                    } catch (e) {
                        alert(e.response.data.message);
                    }
                } else {
                    try {
                        const createResponse = await axios.post(`https://hodory-user-management.herokuapp.com/v1/users`, {
                            "id": this.userId,
                            "password": this.password,
                            "name": this.userName,
                            "level": this.userLevel
                        });
                        this.refreshList();
                    } catch (e) {
                        alert(e.response.data.message);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
