<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="title">Manage</div>
      <p>{{ this.$route.params.id }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Manage',
  data() {
    return {
      breadcrumb: [
        {
          text: 'Licensing',
          active: true
        },
        {
          text: "Products",
          to: {name: 'products'},
          active: false
        },
        {
          text: this.$route.params.id,
          active: true
        },
      ]
    }
  }
};

</script>

<style lang="scss" scoped>
.title {
  text-align: left;

  font-weight: 900;
  font-size: 1.5rem;
}
</style>
