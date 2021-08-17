<template>
  <div id="app">
    {{Data.date}}
    <br>
    {{ Data.min }}
    <br>
    {{ Data.max }}
    <!-- <div class="icon" v-for="item in Data.date" :key="item.date">
      {{Data.min}}
    </div> -->
    <!-- http://openweathermap.org/img/wn/10d@2x.png -->

    <!-- :src="`${Data.icon}.png`"  -->
    <!-- http://openweathermap.org/img/wn/{Data.icon}.png -->
  </div>
</template>
<script>

import axios from "axios";
export default {
  watch: {},
  methods: {
    async getData() {
      const { data } = await axios.get(
        "http://api.openweathermap.org/data/2.5/forecast?q=surin,TH&appid=863e7db8a09555efa25addb298f67645&units=metric"
      );
      console.log(data);
      for (var i = 0; i < data.list.length; i += 8) {
        console.log(data.list[i]);
        this.Data.date.push(data.list[i].dt_txt);
        this.Data.max.push(data.list[i].main.temp_max);
        this.Data.min.push(data.list[i].main.temp_min);

      }

      // console.log(data);
    },
  },
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      Data: {
        min: [],
        max: [],
        date: [],

      },
    };
  },
  mounted() {
    this.getData();
  },
};
</script>
