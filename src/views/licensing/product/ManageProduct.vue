<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">Manage</div>
      </div>
      <b-row class="mt-3 pt-3 ml-0 shadow-sm justify-content-center"
             style="display: inline-block">
        <b-col xl="12" lg="12" md="12" sm="12" cols="12">
          <p class="type">{{ this.product.id }}</p>
          <p class="type">{{ this.product.name }}</p>
        </b-col>
      </b-row>
      <b-form class="mt-4" @submit="submit" @submit.stop.prevent>
        <b-form-group
            id="product-id-group"

            v-model="this.form.id"
            label="Product Id:"
            label-for="product-id-input"
        >
          <b-form-input
              id="product-id-input"
              readonly
              v-model="form.id"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="product-name-group" label="Product Name:" label-for="product-name-input">
          <b-form-input
              :state="nameValidation"
              id="product-name-input"
              v-model="form.name"
              placeholder="Enter product name"
              required
          ></b-form-input>
          <b-form-invalid-feedback :state="nameValidation">
            Your product name must be 5-25 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="nameValidation">
            Your product name is valid.
          </b-form-valid-feedback>
        </b-form-group>

        <b-button type="submit" variant="outline-primary">SAVE</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ManageProduct',
  methods: {
    async submit() {
      if (!this.nameValidation) return;

      // get new product name
      const newProductName = this.form.name;

      // update using supabase
      // eslint-disable-next-line no-unused-vars
      const {data, error} = await this.$supabase
          .from('products')
          .update({name: newProductName})
          .eq('id', this.product.id);

      // push to products
      this.$router.push({name: 'products'});
    }
  },
  computed: {
    nameValidation() {
      return this.form.name.length >= 5 && this.form.name.length <= 25;
    }
  },
  async created() {
    // calculate product id
    this.product.id = this.$route.params.productId;

    // calculate product
    // eslint-disable-next-line no-unused-vars
    const {data, error} = await this.$supabase
        .from('products')
        .select('id, name')
        .eq('id', this.product.id);

    // if error, show error
    if (error || data.length <= 0) {
      this.$router.push({name: 'products'})
      return;
    }

    this.product = data[0] || {name: 'N/A', id: this.product.id};

    // populate form
    this.form.name = this.product.name;
    this.form.id = this.product.id;
  },
  data() {
    return {
      form: {
        name: "",
        id: "",
      },
      product: {name: '', id: undefined},
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
          text: this.$route.params.productId,
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

.type {
  font-weight: 300;
  font-size: 0.9rem;
}
</style>
