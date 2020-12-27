<template>
  <div class="page">
    <div class="scale-with-page">

      <div align="center" class="containment">
        <div class="title">
          Licent
        </div>
        <div class="subtitle">
          The most robust and efficient digital product licensing service.
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
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

.containment {

  font-family: Inter, sans-serif;

  .title {
    font-weight: 900;

    font-size: 50px;
  }

  .subtitle {

    padding: 0 15px;
    color: #64738e;

    font-size: 20px;
  }
}
</style>
