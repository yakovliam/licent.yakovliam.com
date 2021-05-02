<template>
  <div id="app">
    <Header/>
    <vue-page-transition name="fade-in-up">
      <router-view/>
    </vue-page-transition>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Vue from "vue";

export default {
  name: 'App',
  components: {Footer, Header},
  created() {
    // check if logged in or not
    alert(this.$supabase.auth.user());
    Vue.prototype.$loggedIn = this.$supabase.auth.user() !== null;
    // send bus state change
    this.$bus.$emit('loginStateChange');
  }
};
</script>

<style lang="scss">
body, html {
  width: 100%;
  min-height: 100vh;
}

.scale-with-page {

  // Small
  @media only screen and (min-width: 576px) {
    margin-left: 100px;
    margin-right: 100px;
  }

  // Medium
  @media only screen and (min-width: 768px) {
    margin-left: 100px;
    margin-right: 100px;
  }

  // Large
  @media only screen and (min-width: 992px) {
    margin-left: 200px;
    margin-right: 200px;
  }

  // Extra Large
  @media only screen and (min-width: 1200px) {
    margin-left: 200px;
    margin-right: 200px;
  }

  // Extra Large
  @media only screen and (min-width: 1400px) {
    margin-left: 250px;
    margin-right: 250px;
  }

  // +Extra Large
  @media only screen and (min-width: 1600px) {
    margin-left: 350px;
    margin-right: 350px;
  }
}
</style>
