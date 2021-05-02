<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="title">Clients</div>
      <b-row class="mt-3 pt-3 ml-0 shadow-sm justify-content-center" style="display: inline-block">
        <b-col xl="12" lg="12" md="12" sm="12" cols="12">
          <p class="type">{{ this.productId }}</p>
          <p class="type">{{ this.product.name }}</p>
        </b-col>
      </b-row>
      <div class="clients-table">
        <b-table ref="clients-table" id="clients-table" :busy="isBusy" :items="tableProvider" :fields="fields">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <template #cell(actions)="data">
            <b-button size="sm" variant="danger" @click="deleteClient(data)">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="totalRows"
            aria-controls="products-table"
            @input="updateTable"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Clients',
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

    // calculate number of rows
    // eslint-disable-next-line no-unused-vars
    const {data1, error1, count} = await this.$supabase
        .from('clients')
        .select('id', {count: 'exact'});

    this.totalRows = count;
  },
  data() {
    return {
      product: undefined,
      productId: undefined,
      isBusy: false,
      perPage: 2,
      currentPage: 1,
      totalRows: 99,
      fields: ['name', 'id', 'token', 'actions'],
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
          to: {name: 'manage'},
          active: false
        },
        {
          text: "Clients",
          active: true
        }
      ]
    }
  },
  methods: {
    async tableProvider() {
      this.isBusy = true;

      const limit = this.perPage;
      const curr = this.currentPage;

      let minRange = (curr - 1) * limit;
      let maxRange = minRange + limit;

      const {data} = await this.$supabase
          .from('clients')
          .select('id, token, name')
          .eq('product_id', this.productId)
          .range(minRange, maxRange - 1);

      this.isBusy = false;
      return data;
    },
    updateTable() {
      this.$refs['clients-table'].refresh();
    },
    deleteClient(client) {
      alert("delete " + client.item.id);
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

.clients-table {
  padding-top: 2rem;
}

.type {
  font-weight: 300;
  font-size: 1,9rem;
}
</style>
