
import Vue from 'vue';
import VueRouter from 'vue-router';
import RegisterForm from './components/RegisterForm.vue';
import Users from './components/Users.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            component: RegisterForm
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        },
    ],
    mode: 'history'
});