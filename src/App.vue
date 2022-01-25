<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span> | </span>
      <router-link to="/about">About</router-link>
      <span> | </span>
      <router-link v-if="!this.$store.state.user" to="/login"
        >Login</router-link
      >
      <router-link v-if="this.$store.state.user" to="/logout"
        >Logout</router-link
      >
      <span> | </span>
      <router-link v-if="!this.$store.state.user" to="/register"
        >Register</router-link
      >
      <router-link v-if="this.$store.state.user" to="/upload"
        >Upload</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
