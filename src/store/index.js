import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const resourceHost = `https://hodory-user-management.herokuapp.com`;

const enhanceAccessToken = () => {
    const accessToken = localStorage['user-management.accesstoken'];
    if (!accessToken) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
enhanceAccessToken();

export default new Vuex.Store({
    state: {
        accessToken: null,
    },
    getters: {},
    mutations: {
        LOGIN(state, {accessToken}) {
            state.accessToken = accessToken;
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('user-management.accesstoken', accessToken)
        },
        LOGOUT(state) {
            state.accessToken = null;
            localStorage.removeItem('user-management.accesstoken');
        }
    },
    actions: {
        LOGIN({commit}, {email, password}) {
            return axios.post(`${resourceHost}/v1/auth/login`, {email, password})
                .then(({data}) => {
                    commit('LOGIN', data);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                })
        },
        LOGOUT({commit}) {
            axios.defaults.headers.common['Authorization'] = undefined;
            commit('LOGOUT')
        },
    }
})
