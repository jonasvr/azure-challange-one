<script>
export default {
  name: 'AuthLogin',
  props: {
    provider: {
      type: String,
      default: () => 'facebook',
    },
  },
  methods: {
    goAuth() {
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${this.provider}?${redirect}`;
      window.location.href = url;
    },
    async getUserInfo() {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    },
    testOutput(result) {
      console.log(result);
      return 'test';
    },
  },
  beforeMount() {
    this.getUserInfo()
      .then((result) => this.testOutput(result));
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">{{ provider }}</div>
</template>
