<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">New Product</div>
      </div>
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

        <b-button type="submit" variant="outline-primary">CREATE</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewProduct',
  computed: {
    nameValidation() {
      return this.form.name.length >= 5 && this.form.name.length <= 25;
    }
  },
  created() {
    // compute id
    this.form.id = this.generateRandom(8);
  },
  data() {
    return {
      form: {
        name: "",
        id: "",
      },
      breadcrumb: [
        {
          text: 'Licensing',
          active: true
        },
        {
          text: 'Products',
          to: {name: 'products'},
          active: false
        },
        {
          text: 'New Product',
          active: true
        }
      ],
    }
  },
  methods: {
    async submit() {
      // create new object
      const product = {
        id: this.form.id,
        name: this.form.name,
        user_uid: this.$supabase.auth.user().id
      };

      // eslint-disable-next-line no-unused-vars
      const {data, error} = await this.$supabase
          .from('products')
          .insert([
            product
          ]);

      // router push to products page
      this.$router.push({name: 'products'});
    },
    generateRandom(length) {
      return [...Array(length)].map(() => Math.random().toString(36)[2]).join('')
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

button {
  font-family: Inter, sans-serif;
  padding: 5px 13px;

  font-size: 15px;
  font-weight: 800;
}

.products-table {
  padding-top: 2rem;
}
</style>
