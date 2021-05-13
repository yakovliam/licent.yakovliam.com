<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container style="max-width: 30rem">
        <b-row class="mt-5 section">
          <b-col align-self="center" style="text-align: center">
            <b-card
                header="May 13, 2021"
                header-tag="header"
                footer="By: Jacob"
                footer-tag="footer"
                title="Fixes & Effects"
            >
              <b-card-text>Fixed breadcrumb links not working properly</b-card-text>
              <b-card-text>Added text typing effect on home page.</b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-5 section">
          <b-col align-self="center" style="text-align: center">
            <b-card
                header="May 10, 2021 (2)"
                header-tag="header"
                footer="By: Jacob"
                footer-tag="footer"
                title="Editing Update"
            >
              <b-card-text>Added the ability to edit products/clients</b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-5 section">
          <b-col align-self="center" style="text-align: center">
            <b-card
                header="May 10, 2021 (1)"
                header-tag="header"
                footer="By: Jacob"
                footer-tag="footer"
                title="Blog Update"
            >
              <b-card-text>Added Blog/Changelog section</b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Blog',
};
</script>

<style lang="scss" scoped>

.page {
  //TODO Fix this causing a small amount of scrolling required
  min-height: 100vh;

  // Padding
  padding-top: 50px;

  // Background color
  background-color: #fafbfc;
}
</style>
