<template>
  <center>
    <!-- <v-img
      src="../assets/NotFound.png"
      alt="NotFound Page"
      max-width="200"
    ></v-img> -->
<v-icon color="error" size="200">travel_explore</v-icon>
    <p id="found">ไม่พบหน้าที่คุณต้องการ!</p>
    <p>
      <a href="/home">กลับสู่เว็บไซต์</a>
    </p>
  </center>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
#found{
  font-size: 2rem;
}
center {
  margin: 10vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
</style>
