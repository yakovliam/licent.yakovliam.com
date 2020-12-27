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
            <div v-b-tooltip.hover title="Currently: Invite Only">
              <b-button size="sm" class="my-0 my-sm-0 button" squared disabled>LICENSING</b-button>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
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
</style>
