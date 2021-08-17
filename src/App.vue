<template>
  <v-app id="inspire">
    <navBar/>
    <appBar />
    <v-main>
      <vue-confirm-dialog></vue-confirm-dialog>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Made with computer science 60</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import navBar from "./components/nav/navbar.vue";
import appBar from "./components/app-bar/app-bar.vue";
export default {
  components: {
    appBar,
    navBar,
  },

};
</script>

