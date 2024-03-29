<template>
  <div>
    <b-modal v-model="deleteModal.show" id="confirm-delete-modal" centered title="Confirm deletion"
             @ok="handleDeleteClient">
      <p>Are you sure you want to delete the client {{ this.deleteModal.clientName }}?</p>
    </b-modal>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">Clients</div>
        <div class="button-new d-inline float-right">
          <router-link to="clients/new">
            <b-button variant="outline-secondary">NEW
              <b-icon icon="clipboard-plus"></b-icon>
            </b-button>
          </router-link>
        </div>
      </div>
      <b-row class="mt-3 pt-3 ml-0 shadow-sm justify-content-center" style="display: inline-block">
        <b-col xl="12" lg="12" md="12" sm="12" cols="12">
          <p class="type">{{ this.product.id }}</p>
          <p class="type">{{ this.product.name }}</p>
        </b-col>
      </b-row>
      <div class="clients-table">
        <b-table responsive ref="clients-table" id="clients-table" :busy="isBusy" :items="tableProvider"
                 :fields="fields">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <template #cell(allowed)="data">
            <div class="text-nowrap d-inline-flex">
              <b-icon scale="5" icon="dot" class="h5 mt-1"
                      v-bind:class="data.item.allow ? 'online-dot' : 'offline-dot'"></b-icon>
              <p class="ml-2 p-1">{{ data.item.allow ? "Allowed" : "Disallowed" }}</p>
            </div>
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap">
              <b-button size="sm" variant="outline-info" @click="seeData(data)">
                <b-icon icon="clipboard-data"></b-icon>
              </b-button>
              <b-button size="sm" variant="dark" @click="manageClient(data)">
                <b-icon icon="gear"></b-icon>
              </b-button>
              <b-button size="sm" variant="danger" @click="deleteClient(data)">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </div>
          </template>

          <template #cell(token)="data">
            <b-form-input readonly v-model="data.item.token" style="width: auto"></b-form-input>
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

    // calculate number of rows
    // eslint-disable-next-line no-unused-vars
    const {data1, error1, count} = await this.$supabase
        .from('clients')
        .select('id', {count: 'exact'});

    this.totalRows = count;
  },
  data() {
    return {
      deleteModal: {
        show: false,
        clientName: '',
        clientId: ''
      },
      product: {name: '', id: undefined},
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      totalRows: 99,
      fields: ['name', 'id', 'token', 'allowed', 'actions'],
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
          .select('id, token, name, allow')
          .eq('product_id', this.product.id)
          .range(minRange, maxRange - 1);

      this.isBusy = false;
      return data;
    },
    updateTable() {
      this.$refs['clients-table'].refresh();
    },
    deleteClient(client) {
      this.deleteModal.clientName = client.item.name;
      this.deleteModal.clientId = client.item.id;
      this.deleteModal.show = true;
    },
    manageClient(client) {
      const clientId = client.item.id;
      // redirect to manage page
      this.$router.push({name: 'manageclient', params: {clientId}});
    },
    async handleDeleteClient() {
      // get client id from modal data
      const id = this.deleteModal.clientId;

      // delete all logs
      await this.$supabase
          .from('logs')
          .delete()
          .eq('client_id', id);

      // delete from database
      await this.$supabase
          .from('clients')
          .delete()
          .match({'id': id.toString()});

      // refresh
      this.$router.go(0);
    },
    seeData(client) {
      const clientId = client.item.id;
      // redirect to manage page
      this.$router.push({name: 'clientdata', params: {clientId}});
    },
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

.clients-table {
  padding-top: 2rem;
}

.type {
  font-weight: 300;
  font-size: 0.9rem;
}

button {
  font-family: Inter, sans-serif;
  padding: 5px 13px;

  font-size: 15px;
  font-weight: 800;
}

.online-dot {
  size: 10rem;
  color: #3ba55c;
}

.offline-dot {
  color: #ed4245;
}
</style>
