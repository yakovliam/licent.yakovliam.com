<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">New Client</div>
      </div>
      <b-form class="mt-4" @submit="submit" @submit.stop.prevent>
        <b-form-group
            id="client-id-group"

            v-model="this.form.id"
            label="Client Id:"
            label-for="client-id-input"
        >
          <b-form-input
              id="client-id-input"
              readonly
              v-model="form.id"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="client-token-group"

            v-model="this.form.id"
            label="Client Token:"
            label-for="client-token-input"
        >
          <b-form-input
              id="client-token-input"
              readonly
              v-model="form.token"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="client-name-group" label="Client Name:" label-for="client-name-input">
          <b-form-input
              :state="nameValidation"
              id="client-name-input"
              v-model="form.name"
              placeholder="Enter client name"
              required
          ></b-form-input>
          <b-form-invalid-feedback :state="nameValidation">
            Your client name must be 5-25 characters long.
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
  name: 'NewClient',
  computed: {
    nameValidation() {
      return this.form.name.length >= 5 && this.form.name.length <= 25;
    }
  },
  created() {
    // compute id
    this.form.id = this.generateRandom(8);
    // compute token
    this.form.token = this.generateRandom(8);
    // compute product id
    this.productId = this.$route.params.productId;
  },
  data() {
    return {
      productId: undefined,
      form: {
        name: "",
        token: "",
        id: "",
      },
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
          to: {name: 'manageproduct'},
          active: false
        },
        {
          text: "Clients",
          to: {name: 'clients'},
          active: false
        },
        {
          text: "New Client",
          active: true
        }
      ]
    }
  },
  methods: {
    async submit() {
      if (!this.nameValidation) return;

      // create new object
      const client = {
        id: this.form.id,
        product_id: this.$route.params.productId,
        token: this.form.token,
        name: this.form.name,
        user_uid: this.$supabase.auth.user().id
      };

      // eslint-disable-next-line no-unused-vars
      const {data, error} = await this.$supabase
          .from('clients')
          .insert([
            client
          ]);

      // router push to clients page
      this.$router.push({name: 'clients'});
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
