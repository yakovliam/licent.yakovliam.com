<template>

  <div class="page">
    <div class="scale-with-page">
      <b-container class="container-1">
        <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
        <b-row class="justify-content-center">
          <b-col xl="12" lg="12" md="12" sm="12" cols="12">
            <div class="card-box shadow-sm p-3 mb-5 bg-white rounded-lg">
              <div class="top">
                <div class="title d-inline">Profile Info</div>
              </div>
              <div class="info">
                <b-form>
                  <b-form-group
                      id="email-group"
                      label="Email address:"
                      label-for="email-input"
                  >
                    <b-form-input
                        id="email-input"
                        v-model="user.email"
                        type="email"
                        readonly
                        required
                    ></b-form-input>
                  </b-form-group>
                </b-form>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  created() {
    // compute user
    this.user = this.$supabase.auth.user();
  },
  data() {
    return {
      user: {},
      breadcrumb: [
        {
          text: 'Profile',
          active: true
        },
      ],
    }
  },
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

.info {
  margin-top: 1rem;

  input {
    width: auto;
  }
}

button {
  font-family: Inter, sans-serif;
  padding: 5px 13px;

  font-size: 15px;
  font-weight: 800;
}

.page {
  // Background color
  background-color: #fafbfc;
}

.container-1 {
  padding-top: 1rem;
  padding-bottom: 25rem;
}
</style>
