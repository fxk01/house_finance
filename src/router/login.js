const LoginRegister = () => import('../page/LoginRegister/LoginRegister.vue');
const Login = () => import('../page/LoginRegister/Login/Login.vue');
const Register = () => import('../page/LoginRegister/Register/Register.vue');
const RegisterSuccess = () => import('../page/LoginRegister/RegisterSuccess/RegisterSuccess.vue');

export default {
  path: '/loginRegister',
  name: 'loginRegister',
  redirect: {
    name: 'login'
  },
  component: LoginRegister,
  children: [{
      path: 'login',
      name: 'login',
      component: Login,
      meta: {
        title: '山东高速房金',
        backHome:true
      }
    },
    {
      path: 'register',
      name: 'register',
      component: Register,
      meta: {
        title: '山东高速房金',
        backHome:true
      }
    },
    {
      path: 'registerSuccess',
      name: 'registerSuccess',
      component: RegisterSuccess,
      meta: {
        title: '山东高速房金'
      }
    }
  ]
}
