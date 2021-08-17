<template>
  <v-row>
    <!-- date -->
    <v-col cols="12" md="3" class="pa-2">
      <v-card dark>
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-icon color="light-green accent-2">mdi-calendar-range</v-icon>
          </v-list-item-avatar>
          <v-row align="center" justify="end">
            <v-list-item two-line>
              <v-list-item-content justify="end">
                <v-list-item-title>
                  <span style="font-size:0.8rem">{{ day }}</span>
                </v-list-item-title>
                <v-list-item-title>
                  <span style="font-size:0.8rem">เวลา {{ timestamp }} น.</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-list-item>
      </v-card>
    </v-col>
    <!-- สภาพอากาศ -->
    <v-col cols="12" md="3" class="pa-2">
      <v-card dark>
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-img
              v-if="icon"
              max-width="60"
              v-bind:src="
                'http://openweathermap.org/img/w/' + Data.icon[0] + '.png'
              "
            >
            </v-img>
          </v-list-item-avatar>
          <v-row align="center" justify="end">
            <v-list-item two-line>
              <v-list-item-content justify="end">
                <v-list-item-title>
                  <span style="font-size:0.8rem">{{
                    Data.description[0]
                  }}</span>
                </v-list-item-title>

              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-list-item>
      </v-card>
    </v-col>
    <!--temp -->
    <v-col cols="12" md="3" sm="6" class="pa-2">
      <v-card dark>
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-icon color="deep-orange">mdi-home-thermometer</v-icon>
          </v-list-item-avatar>
          <v-row align="center" justify="end">
            <v-list-item two-line>
              <v-list-item-content justify="end">
                <v-list-item-title>
                  <span style="font-size:0.8em"
                    >อุณหภูมิ {{ Data.temp[0] }} &deg;C</span
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-list-item>
      </v-card>
    </v-col>
    <!-- sun -->
    <v-col cols="12" md="3" class="pa-2">
      <v-card dark style="overflow:hidden">
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-icon color="yellow accent-4">mdi-weather-sunset</v-icon>
          </v-list-item-avatar>
          <v-row align="center">
            <v-list-item two-line>
              <v-list-item-content justify="between">
                <v-list-item-title>
                  <span style="font-size:0.8rem"
                    >พระอาทิตย์ขึ้น {{ sunrise }} น.</span
                  >
                </v-list-item-title>
                <v-list-item-title>
                  <span style="font-size:0.8rem"
                    >พระอาทิตย์ตก {{ sunset }} น.</span
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
const axios = require("axios");
export default {
  methods: {
    // dataApi() {
    //   axios({
    //     async: true,
    //     crossDomain: true,
    //     url: `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=สุรินทร์&amphoe=เมืองสุรินทร์&fields=rain,ws700,wd700,tc_max,tc_min,rh,cond,ws10m,wd10m,slp,psfc,cloudlow,cloudmed,cloudhigh,swdown&date=${this.query}&duration=2`,
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //       authorization:
    //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU1YjZiYzQ0NzlhOTE4YjJmNDQ0NDJjNzQ1MTViYzBkNTI5NTVjNzJjMzkxZjUyNTMwMTRkZjVkODRkNzVjM2ZkZmY3ZDhlMTkzOWU3NDcyIn0.eyJhdWQiOiIyIiwianRpIjoiNTViNmJjNDQ3OWE5MThiMmY0NDQ0MmM3NDUxNWJjMGQ1Mjk1NWM3MmMzOTFmNTI1MzAxNGRmNWQ4NGQ3NWMzZmRmZjdkOGUxOTM5ZTc0NzIiLCJpYXQiOjE2MjczMDQ1MDgsIm5iZiI6MTYyNzMwNDUwOCwiZXhwIjoxNjU4ODQwNTA4LCJzdWIiOiIxNTQyIiwic2NvcGVzIjpbXX0.ViZacdNFhr1CxH09ixbOOC9ocrohtoM_o0XyhepqgbcNUc_JodHZGiMzMYoniTcpHnUk1hSbY352RGiWpnJL9fXwNZGfeHTQU2xes9scInA03pH0TgffOjk9-xNyYtRJ1vnrhbop8MP-V_FaiX6oCyFMgPegjEAHgNArgoCtHjVr2BxCNhyP3SY4Wtw8g5D3rXx28ch3u3w7pkVZpAFEexZa-AMwXR1HwKYZY3kQTdDFmYt1ybM8f2S12ZfHVmB81ilxWGiwOE7QsXBsdA4Hw8GuMPpTgOSlNT818TR5KwSspZznqI2bqnuqSDj1F9Jw-KT2XBwROe16_gx0-k6VcOWWl4N1s23fKmlvmt21_ruXk1pu6aOJXigwgrNf9pOh2QQLsp1Aiqu7hV49q7B4mm55x9J4i3k0OfppJEXFLuYOWSVyphggas4k847tlBZk07yRaKzCywry5yW-W9R9S9-sF5dfuIQIWbJYxcgjPu4mn6cK64E2pq0tMbRW0gLrTP3XK1ChentB6SrGQiGeWwUQ3b_U60f0m5-rgybgKc6fFmf3cYxF99s-fIE8vJUF9fno_hiGry90PTs7VvbCN37-bu_8VgSXyq9fwTVgBwEDavUbBxuxAwDWdPVZ3PgoKH7V17S7xHYPYIuzNP9p-aT6_WSvwh67supULI3H7w8",
    //     },
    //   }).then((response) => {
    //     console.log(response.data.WeatherForecasts[0].forecasts);
    //     this.Data.max.push(
    //       response.data.WeatherForecasts[0].forecasts[0].data.tc_max
    //     );
    //     this.Data.min.push(
    //       response.data.WeatherForecasts[0].forecasts[0].data.tc_min
    //     );
    //   });
    // },
    getNow() {
      // this.loader = false
      const today = new Date();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.timestamp = time;
      this.timestamp = today.toLocaleString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      const date = new Date(); // create a new reference here
      this.day = date.toLocaleString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      this.loader = true;
      this.icon = true;
    },
  },
  async created() {
    this.loader = false;
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city},th&appid=863e7db8a09555efa25addb298f67645&units=metric`
      )
      .then((response) => {
        console.log(response);
        // create a new reference here
        this.Data.icon.push(response.data.weather[0].icon);
        this.Data.temp.push(response.data.main.temp);
        this.Data.description.push(response.data.weather[0].description);

        const sun = new Date(response.data.sys.sunset * 1000); //อาทิตย์ขึ้น
        const rise = new Date(response.data.sys.sunrise * 1000); //อาทิตย์ตก
        // sunset
        var hours = sun.getHours();
        var minutes = "0" + sun.getMinutes();
        var formattedTime = hours + ":" + minutes.substr(-2);

        // sunrise
        var hours2 = rise.getHours();
        var minutes2 = "0" + rise.getMinutes();
        var formattedTime2 = hours2 + ":" + minutes2.substr(-2);

        this.sunrise = formattedTime2;
        this.sunset = formattedTime;
      })
      .then(() => {
        this.loader = true;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      loader: false,
      icon: false,
      timestamp: "",
      hours: "",
      minutes: "",
      seconds: "",
      interval: 0,
      intervalTemp: 0,
      query: new Date().toISOString().slice(0, 10),
      city: "สุรินทร์",
      day: "",
      sunset: "",
      sunrise: "",
      Data: {
        min: [],
        max: [],
        temp: [],
        icon: [],
        date: [],
        description: [],
      },
    };
  },
  mounted() {
    this.interval = setInterval(this.getNow, 1000);
    this.intervalTemp = setInterval(this.created, 1000);
    // this.dataApi();
  },
  beforeDestroy() {
    clearInterval(this.interval, this.intervalTemp);
  },
};
</script>
