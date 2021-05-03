<template>
  <div class="page">
    <div class="navbar-a scale-with-page">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand>
          <router-link to="/home">
            <b-img src="~/../assets/icon.svg" width="25px" class="img"></b-img>
          </router-link>
          <b-nav-text class="ml-2">Licent</b-nav-text>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <router-link to="/licensing">
              <div>
                <b-button size="sm" class="licensing-button button" squared>
                  <span>LICENSING</span>
                  <b-icon class="mr-1" icon="lock"></b-icon>
                </b-button>
              </div>
            </router-link>
            <router-link to="/profile">
              <b-button v-if="this.isLoggedIn" size="sm" class="ml-xl-1 ml-lg-1 button" squared>
                <span>PROFILE</span>
                <b-icon class="mr-1" icon="person"></b-icon>
              </b-button>
            </router-link>
            <router-link to="/home">
              <b-button v-if="this.isLoggedIn" size="sm" class="ml-xl-1 ml-lg-1 button" squared v-on:click="logout">
                <span>LOG OUT</span>
                <b-icon class="mr-1" icon="power"></b-icon>
              </b-button>
            </router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'Header',
  methods: {
    logout() {
      this.$supabase.auth.signOut();
      // send bus
      Vue.prototype.$loggedIn = false;
      this.$bus.$emit('loginStateChange');
      // redirect to home
      this.$router.push('home');
    }
  },
  data() {
    return {
      isLoggedIn: Vue.prototype.$loggedIn
    }
  },
  created() {
    this.$bus.$on('loginStateChange', () => {
      this.isLoggedIn = Vue.prototype.$loggedIn;
    });
  }
};

</script>

<style lang="scss" scoped>
.page {
  // Background color
  background-color: #fafbfc;
}

.navbar-a {
  font-family: Inter, sans-serif;
}

.button {
  padding: 5px 13px;

  font-size: 15px;
  font-weight: 800;

  background-color: #22282f;
}

button span {
  max-width: 0;
  -webkit-transition: max-width 1s;
  transition: max-width 1s;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  overflow: hidden;
}
button:hover span {
  max-width: 7rem;
}
</style>
