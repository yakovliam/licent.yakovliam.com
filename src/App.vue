<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: 'App',
  components: {Footer, Header},
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
}
</style>
