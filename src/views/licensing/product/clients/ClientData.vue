<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
      <div class="top">
        <div class="title d-inline">Data</div>
      </div>
      <b-row class="mt-3 pt-3 ml-0 shadow-sm justify-content-center" style="display: inline-block">
        <b-col xl="12" lg="12" md="12" sm="12" cols="12">
          <p class="type">{{ this.client.id }}</p>
          <p class="type">{{ this.client.name }}</p>
        </b-col>
      </b-row>
      <div class="pt-3 pb-3 subtitle">Date Range</div>
      <div class="d-inline-block">
        <b-form-datepicker id="example-datepicker" v-model="dateRange.from" class="mb-2"></b-form-datepicker>
        <b-form-datepicker id="example-datepicker" v-model="dateRange.to" class="mb-2"></b-form-datepicker>
      </div>
      <div class="mt-4">
        <b-button @click="fillChartData()" variant="outline-success">Calculate</b-button>
        <div class="mt-3">
          <LineChart v-if="dataExists" :options="this.chart.options" :chart-data="this.chart.data"></LineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../../../../LineChart";
import * as d3 from 'd3';

export default {
  name: 'ClientData',
  components: {
    LineChart
  },
  mounted() {
    this.dataExists = true;
  },
  methods: {
    async fillChartData() {
      if (!this.dateRange.from || !this.dateRange.to) {
        return;
      }

      // have to toggle off because it throws an async error when trying to update and show transitions...
      this.dataExists = false;

      // reset data
      this.chart.data.datasets = [];

      // calculate date interpolation
      const startDate = new Date(this.dateRange.from);
      const endDate = new Date(this.dateRange.to);
      endDate.setDate(endDate.getDate() + 1);

      const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const n = dayDiff;

      const parser = d3.timeParse("%Y-%m-%d");
      const formatDate = d3.timeFormat("%Y-%m-%d");

      const scale = d3.scaleTime()
          .domain([parser(startDate.toISOString().slice(0, 10)), parser(endDate.toISOString().slice(0, 10))])
          .range([0, n]);

      this.chart.data.labels = d3.range(n).map(function (k) {
        return scale.invert(k)
      }).map(a => formatDate(a));

      // date labels done, now let's fetch data
      const {data, error} = await this.$supabase
          .from('logs')
          .select("*")
          .eq("client_id", this.client.id);

      if (error) return;

      // use data
      const newData = data.map(e => {
        return {timestamp: new Date(e.timestamp), accepted: e.accepted};
      });

      // loop through data, plotting adding to datasets
      // create new dataset for rejected
      const rejectedSet = {
        label: "Rejected Requests",
        borderColor: 'rgb(255,77,92)',
        fill: false,
        tension: 0.1,
        data: []
      }
      // create new dataset for accepted
      const acceptedSet = {
        label: "Accepted Requests",
        borderColor: 'rgb(145,255,81)',
        fill: false,
        tension: 0.1,
        data: []
      }

      // loop through dates and check how many rejected for that day, etc
      for (let i = 0; i < this.chart.data.labels.length; i++) {
        const date = this.chart.data.labels[i];
        // get rejected count for day
        const rejectedCount = newData.filter(e => formatDate(e.timestamp) === date && !e.accepted).length;
        // get accepted count for day
        const acceptedCount = newData.filter(e => formatDate(e.timestamp) === date && e.accepted).length;

        rejectedSet.data.push(rejectedCount);
        acceptedSet.data.push(acceptedCount);
      }

      // autoscale options
      this.chart.options.scales.yAxes[0].ticks.suggestedMax = (Math.max(Math.max.apply(this, acceptedSet.data) + 1, Math.max.apply(this, rejectedSet.data) + 1));
      // set datasets
      this.chart.data.datasets.push(rejectedSet);
      this.chart.data.datasets.push(acceptedSet);

      // set data exists
      this.dataExists = true;
    },
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
        .select('id, name')
        .eq('id', this.client.id);

    if (error || data.length <= 0) {
      // redirect to products
      this.$router.push('/licensing/products');
    }

    this.client = data[0] || {id: this.client.id, name: "N/A"};
  },
  data() {
    return {
      chart: {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                suggestedMax: 10,
                stepSize: 1
              }
            }]
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      dataExists: false,
      dateRange: {
        from: undefined,
        to: undefined
      },
      client: {
        id: '', name: ''
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
          text: this.$route.params.clientId,
          to: {name: 'manageclient'},
          active: false
        },
        {
          text: "Data",
          active: true
        }
      ]
    }
  }
}
;

</script>

<style lang="scss" scoped>
.top {
  .title {
    text-align: left;

    font-weight: 900;
    font-size: 1.5rem;
  }
}

.subtitle {
  text-align: left;

  font-weight: 300;
  font-size: 1.3rem;
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
</style>
