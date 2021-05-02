<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">Manage</div>
      </div>
      <b-row class="mt-3 pt-3 ml-0 shadow-sm justify-content-center" style="display: inline-block">
        <b-col xl="12" lg="12" md="12" sm="12" cols="12">
          <p class="type">{{ this.productId }}</p>
          <p class="type">{{ this.product.name }}</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Manage',
  async created() {
    // calculate product id
    this.productId = this.$route.params.id;

    // calculate product
    // eslint-disable-next-line no-unused-vars
    const {data, error} = await this.$supabase
        .from('products')
        .select('id, name')
        .eq('id', this.productId);
    this.product = data[0] || {name: 'N/A'};
  },
  data() {
    return {
      product: {name: ''},
      productId: undefined,
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
.top {
  .title {
    text-align: left;

    font-weight: 900;
    font-size: 1.5rem;
  }
}
</style>
