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
                        <input class="input is-success" type="text" placeholder="Text input" v-model="user.userId"
                               v-bind:aria-readonly="isUpdate">
                        <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
                        <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
                    </div>
                </div>

                <template v-if="!isUpdate">
                    <div class="field">
                        <label class="label">회원명</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-success" type="password">
                            <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
                            <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
                        </div>
                        <p class="help is-success">This username is available</p>
                    </div>
                </template>

                <div class="field">
                    <label class="label">회원명</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" v-model="user.name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">등급</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="user.level">
                                <option
                                        v-for="(_level,_key) in levels" v-bind:key="_key" v-bind:value="_key">
                                    {{_level}}

                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
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
    export default {
        name: "UserModal",
        props: [
            'user',
            'isOpen',
            'changeModalStatus'
        ],
        data: function () {
            return {
                levels: {
                    1: "Bronze",
                    2: "Silver",
                    3: "Gold",
                    4: "Platinum",
                    5: "Diamond",
                    99: "Master"
                }
            }
        },
        computed: {
            isUpdate() {
                return (this.user);
            },
            _statusText() {
                return (this.isUpdate) ? "수정" : "등록";
            }
        }
    }
</script>

<style scoped>

</style>
