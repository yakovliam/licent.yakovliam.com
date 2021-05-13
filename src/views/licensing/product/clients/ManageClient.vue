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
          <p class="type">{{ this.client.id }}</p>
          <p class="type">{{ this.client.name }}</p>
        </b-col>
      </b-row>
      <b-form class="mt-4" @submit="submit" @submit.stop.prevent>
        <b-form-group
            id="client-id-group"
            label="Client Id:"
            label-for="client-id-input"
        >
          <b-form-input
              id="client-id-input"
              readonly
              v-model="form.id"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="client-token-group" label="Client Token:" label-for="client-token-input">
          <b-form-input
              id="client-token-input"
              v-model="form.token"
              readonly
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
            Your client name is valid.
          </b-form-valid-feedback>
        </b-form-group>

        <b-button type="submit" variant="outline-primary">SAVE</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ManageClient',
  methods: {
    async submit() {
      if (!this.nameValidation) return;

      // get new client name
      const newClientName = this.form.name;

      // update using supabase
      // eslint-disable-next-line no-unused-vars
      const {data, error} = await this.$supabase
          .from('clients')
          .update({name: newClientName})
          .eq('id', this.client.id);

      // push to clients
      this.$router.push({name: 'clients'});
    },
  },
  computed: {
    nameValidation() {
      return this.form.name.length >= 5 && this.form.name.length <= 25;
    }
  },
  async created() {
    // calculate client id
    this.client.id = this.$route.params.clientId;

    // eslint-disable-next-line no-unused-vars
    await this.$supabase
        .from('products')
        .select('id, name')
        .eq('id', this.$route.params.productId).then((data1) => {
          if (data1.error || data1.data.length <= 0) {
            // redirect to products
            this.$router.push({name: 'products'});
          }
        });

    // calculate client
    // eslint-disable-next-line no-unused-vars
    const {data, error} = await this.$supabase
        .from('clients')
        .select('id, name, token')
        .eq('id', this.client.id);

    if (error || data.length <= 0) {
      // redirect to products
      this.$router.push('clients');
    }

    this.client = data[0] || {id: this.client.id, name: "N/A", token: "N/A"};

    // populate form
    this.form.name = this.client.name;
    this.form.id = this.client.id;
    this.form.token = this.client.token;
  },
  data() {
    return {
      client: {
        id: '', name: undefined,
      },
      form: {
        name: "",
        id: "",
        token: "",
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
          active: false
        },
        {
          text: this.$route.params.clientId,
          active: true
        }
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
