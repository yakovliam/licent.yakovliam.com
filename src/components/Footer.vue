<template>
  <div class="page">
    <div class="scale-with-page">
      <footer>
        <hr/>
        <b-container class="text-left">
          <b-row class="center-mobile">
            <b-col md="6">
              <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Licent Licensing</h5>
              <p>Licent Licensing is a private organization dedicated to keeping digital product licensing simple.</p>
            </b-col>
            <hr class="clearfix w-100 d-md-none"/>
            <b-col class="center-mobile" md="2">
              <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Links</h5>
              <ul class="list-unstyled">
                <li><a href="https://www.yakovliam.com/">Yakovliam</a></li>
                <li><a href="https://licent.yakovliam.com/">Site Home</a></li>
              </ul>
            </b-col>
            <!--            <hr class="clearfix w-100 d-md-none"/>-->
            <!--            <b-col class="center-mobile" md="2">-->
            <!--              <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Links</h5>-->
            <!--              <ul class="list-unstyled">-->
            <!--                <li><a href="#!">Link 1</a></li>-->
            <!--                <li><a href="#!">Link 2</a></li>-->
            <!--                <li><a href="#!">Link 3</a></li>-->
            <!--                <li><a href="#!">Link 4</a></li>-->
            <!--              </ul>-->
            <!--            </b-col>-->
            <!--            <hr class="clearfix w-100 d-md-none"/>-->
            <!--            <b-col class="center-mobile" md="2">-->
            <!--              <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Links</h5>-->
            <!--              <ul class="list-unstyled">-->
            <!--                <li><a href="#!">Link 1</a></li>-->
            <!--                <li><a href="#!">Link 2</a></li>-->
            <!--                <li><a href="#!">Link 3</a></li>-->
            <!--                <li><a href="#!">Link 4</a></li>-->
            <!--              </ul>-->
            <!--            </b-col>-->
          </b-row>
        </b-container>
        <hr/>
        <div class="text-center py-3">
          <ul class="list-unstyled list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="mb-1">Register for free</h5>
            </li>
            <li class="list-inline-item">
              <router-link
                  :disabled="true"
                  to="/signup">
                <div v-b-tooltip.hover title="Currently: Invite Only">
                  <button type="button" class="btn btn-outline-primary" disabled>Sign Up</button>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <hr/>
        <div class="text-center">
          <ul class="list-unstyled list-inline">
            <li class="list-inline-item"><a class="btn-floating btn-sm btn-fb mx-1"><i class="fab fa-facebook"> </i></a>
            </li>
            <li class="list-inline-item"><a class="btn-floating btn-sm btn-tw mx-1"><i class="fab fa-twitter"> </i></a>
            </li>
            <li class="list-inline-item"><a class="btn-floating btn-sm btn-gplus mx-1"><i
                class="fab fa-google-plus"> </i></a></li>
            <li class="list-inline-item"><a class="btn-floating btn-sm btn-li mx-1"><i
                class="fab fa-linkedin-in"> </i></a>
            </li>
            <li class="list-inline-item"><a class="btn-floating btn-sm btn-dribbble mx-1"><i
                class="fab fa-dribbble"> </i></a></li>
          </ul>
        </div>
        <div class="footer-copyright text-center py-3">
          <b-container fluid>
            &copy; {{ date }} Copyright <a href="https://www.yakovliam.com/"> Yakovliam.com </a>
          </b-container>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
};

</script>

<style lang="scss" scoped>
.page {
  // Background color
  background-color: #fafbfc;

  font-family: Inter, sans-serif;
}


hr {
  display: block;
  height: 1px;

  margin-top: 0;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.center-mobile {

  @media only screen and (max-width: 600px) {
    text-align: center;
  }
}

a {
  color: #797171;

  &:hover {
    color: #bbb2b2;
  }
}

</style>
