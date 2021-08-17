<template>
  <v-row>
    <v-col cols="12">
      <v-skeleton-loader
        v-bind="attrs"
        type="table-heading,table-thead, table-tbody,table-tfoot"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
  }),
};
</script>
