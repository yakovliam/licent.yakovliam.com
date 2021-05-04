<template>
  <div>
    <b-modal v-model="deleteModal.show" id="confirm-delete-modal" centered title="Confirm deletion"
             @ok="handleDeleteProduct">
      <p>Are you sure you want to delete the product {{ this.deleteModal.productName }}?</p>
    </b-modal>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">Products</div>
        <div class="button-new d-inline float-right">
          <router-link to="products/new">
            <b-button variant="outline-secondary">NEW
              <b-icon icon="clipboard-plus"></b-icon>
            </b-button>
          </router-link>
        </div>
      </div>
      <div class="products-table">
        <b-table responsive ref="products-table" id="products-table" :busy="isBusy" :items="tableProvider"
                 :fields="fields">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap">
              <b-button size="sm" variant="outline-info" @click="seeClients(data)">
                <b-icon icon="people"></b-icon>
              </b-button>
              <b-button size="sm" variant="dark" @click="manageProduct(data)">
                <b-icon icon="gear"></b-icon>
              </b-button>
              <b-button size="sm" variant="danger" @click="deleteProduct(data)">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </div>
          </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="totalRows"
            aria-controls="products-table"
            @input="updateTable"
            last-number
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
      deleteModal: {
        show: false,
        productName: '',
        productId: ''
      },
      isBusy: false,
      perPage: 10,
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
          to: {name: 'products'},
          active: true
        }
      ],
    }
  },
  methods: {
    seeClients(product) {
      const productId = product.item.id;
      // redirect to manage page
      this.$router.push({name: 'clients', params: {productId}});
    },
    manageProduct(product) {
      const productId = product.item.id;
      // redirect to manage page
      this.$router.push({name: 'manage', params: {productId}});
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
    },
    deleteProduct(product) {
      this.deleteModal.productName = product.item.name;
      this.deleteModal.productId = product.item.id;
      this.deleteModal.show = true;
    },
    async handleDeleteProduct() {
      // get product id from modal data
      const id = this.deleteModal.productId;

      // first, delete all clients that josh is related too
      await this.$supabase
          .from('clients')
          .delete()
          .match({'product_id': id});

      // delete from database
      await this.$supabase
          .from('products')
          .delete()
          .match({id: id});

      // refresh
      this.$router.go(0);
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

  .button-new {
    text-align: right;
  }
}

.products-table {
  padding-top: 2rem;
}

button {
  font-family: Inter, sans-serif;
  padding: 5px 13px;

  font-size: 15px;
  font-weight: 800;
}
</style>
