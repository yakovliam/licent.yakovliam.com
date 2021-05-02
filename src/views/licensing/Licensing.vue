<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container class="container-1">
        <b-row class="justify-content-center">
          <b-col xl="12" lg="12" md="12" sm="12" cols="12">
            <router-view></router-view>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Licensing',
};

</script>

<style lang="scss" scoped>
.page {
  // Background color
  background-color: #fafbfc;
}

.container-1 {
  padding-top: 1rem;
  padding-bottom: 25rem;
}


.title {
  text-align: left;

  font-weight: 900;
  font-size: 1.5rem;
}

.clients-table {
  padding-top: 2rem;
}
</style>
