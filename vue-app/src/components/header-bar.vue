<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
  },
  props: {
    user: {
      type: Object,
      default: () => '',
    },
    loggedIn: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    async getUserInfo() {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    },
    logUser(result) {
      console.log(result.userDetails);
      this.loggedIn = true;
      this.user = result;
      return 'ok';
    },
  },
  beforeMount() {
    this.getUserInfo()
      .then((result) => this.logUser(result));
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
          <div v-if="loggedIn" class="navbar-item">{{ user.userDetails }}</div>
        </div>
         <div class="navbar-end">
            <AuthLogin></AuthLogin>
        </div>
      </div>
    </nav>
  </header>
</template>
