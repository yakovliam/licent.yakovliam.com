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
  @media only screen and (min-width: 600px) {
    margin-left: 100px;
    margin-right: 100px;
  }

  @media only screen and (min-width: 800px) {
    margin-left: 100px;
    margin-right: 100px;
  }

  @media only screen and (min-width: 1100px) {
    margin-left: 200px;
    margin-right: 200px;
  }

  @media only screen and (min-width: 1600px) {
    margin-left: 300px;
    margin-right: 300px;
  }
}
</style>
