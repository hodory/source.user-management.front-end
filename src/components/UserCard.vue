<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{user.name}}</strong> #{{levelText}}
                        <br/>
                        <small>{{user.userId}}</small>
                        <br/>
                        <small>가입일자: {{_toLocalTime(user.createdAt)}}</small>
                        <br>
                        <template v-if="user.updatedAt">
                            <small>수정시간: {{_toLocalTime(user.updatedAt)}}</small>
                            <br>
                        </template>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import * as dayJs from 'dayjs';

    export default {
        name: "UserCard",
        props: [
            'user'
        ],
        methods: {
            _toLocalTime(time) {
                return dayJs(time).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        computed: {
            levelText() {
                switch (this.user.level) {
                    case 1 :
                        return "Bronze";
                    case 2 :
                        return "Silver";
                    case 3 :
                        return "Gold";
                    case 4 :
                        return "Platinum";
                    case 5 :
                        return "Diamond";
                    case 99 :
                        return "Master";
                }
                return this.user.level
            }
        }
    }
</script>

<style scoped>

</style>
