<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="title">Products</div>
      <div class="products-table">
        <b-table ref="products-table" id="products-table" :busy="isBusy" :items="tableProvider" :fields="fields">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <template #cell(actions)="data">
            <b-button size="sm" variant="outline-info" @click="seeClients(data)">
              <b-icon icon="people"></b-icon>
            </b-button>
            <b-button size="sm" variant="dark" @click="manageProduct(data)">
              <b-icon icon="gear"></b-icon>
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteProduct(data)">
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
  name: 'Products',
  async created() {
    // calculate number of rows
    // eslint-disable-next-line no-unused-vars
    const {data, error, count} = await this.$supabase
        .from('products')
        .select('id', {count: 'exact'});

    this.totalRows = count;
  },
  data() {
    return {
      isBusy: false,
      perPage: 2,
      currentPage: 1,
      totalRows: 99,
      fields: ['name', 'id', 'actions'],
      breadcrumb: [
        {
          text: 'Licensing',
          active: true
        },
        {
          text: 'Products',
          to: {name: 'licensing'},
          active: true
        }
      ],
    }
  },
  methods: {
    seeClients(product) {
      const id = product.item.id;
      // redirect to manage page
      this.$router.push({name: 'clients', params: {id}});
    },
    manageProduct(product) {
      const id = product.item.id;
      // redirect to manage page
      this.$router.push({name: 'manage', params: {id}});
    },
    deleteProduct(product) {
      alert("delete " + product.item.id);
    },
    async tableProvider() {
      this.isBusy = true;

      const limit = this.perPage;
      const curr = this.currentPage;

      let minRange = (curr - 1) * limit;
      let maxRange = minRange + limit;

      const {data} = await this.$supabase
          .from('products')
          .select('id, name')
          .range(minRange, maxRange - 1);

      this.isBusy = false;
      return data;
    },
    updateTable() {
      this.$refs['products-table'].refresh();
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

.products-table {
  padding-top: 2rem;
}
</style>
