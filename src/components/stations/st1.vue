<template>
  <div>
    <v-col v-if="!loader">
      <st1loader></st1loader>
    </v-col>
    <v-col v-if="loader">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="apiData"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:[`item.row`]="{ item }">
            {{
        desert
          .map(function (index) {
            return index.row;
          }).indexOf(item.row)+1,

            }}
          </template>
          //disable-pagination :hide-default-footer="true"
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title
                >ข้อมูลสภาพอากาศรายวันจากกรมอุตุนิยมวิทยา</v-toolbar-title
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              >
              </v-text-field>
            </v-toolbar>
          </template>

          <!-- <template v-slot:[`item.Date`]="{ item }">
          {{ moment(item.Date).format("MMMM Do YYYY") }}
        </template> -->
          <template v-slot:footer>
            <v-col cols="12"
              ><v-row>
                <v-card-actions>
                  <v-btn small color="light-blue darken-4">
                    <download-csv
                      class="ma-2 white--text"
                      :data="apiData"
                      name="ตัวอย่างข้อมูล.csv"
                    >
                      ดาวน์โหลดไฟล์ csv
                      <v-icon right dark>
                        mdi-file-download
                      </v-icon>
                    </download-csv>
                  </v-btn>
                </v-card-actions>
              </v-row></v-col
            >
          </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
            <p>ไม่พบข้อมูล</p>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
import st1loader from "../loader/st1-loader.vue";
export default {
  components: {
    st1loader,
  },
  data() {
    return {
      loader: false,
      date: "",
      apiData: [],
      query: new Date().toISOString().slice(0, 10),
      file: "",
      dialog: false,
      search: "",
      tutorials: [],
      title: "",
      percent: {},
      headers: [
        { text: "วันเวลา", value: "date" },
        { text: "ปริมาณเมฆเฉลี่ยที่ความสูงระดับสูง", value: "cloudhigh" },
        {
          text: "ปริมาณเมฆเฉลี่ยที่ความสูงระดับต่ำ	",
          align: "start",
          value: "cloudlow",
        },
        {
          text: "ปริมาณเมฆเฉลี่ยที่ความสูงระดับกลาง	",
          sortable: false,
          value: "cloudmed",
        },
        { text: "สภาพอากาศโดยทั่วไป	", value: "cond" },
        { text: "ความกดอากาศที่ระดับพื้นผิว	", value: "psfc" },
        { text: "ปริมาณฝนรวม 24 ชม.", value: "rain" },
        {
          text: "ความชื้นสัมพัทธเฉลี่ย ที่ระดับพื้นผิว",
          value: "rh",
          sortable: false,
        },

        { text: "ความกดอากาศเฉลี่ย ที่ระดับน้ำทะเล", value: "slp" },
        { text: "ปริมาณรังสีคลื่นสั้นที่ระดับพื้นผิว", value: "swdown" },
        { text: "อุณหภูมิสูงสุด ที่ระดับพื้นผิว", value: "tc_max" },
        { text: "อุณหภูมิต่ำสุด ที่ระดับพื้นผิว", value: "tc_min" },
        { text: "ทิศทางลมสูงสุดที่ระดับความสูง 10 เมตร", value: "wd10m" },
        { text: "	ความเร็วลมสูงสุดที่ระดับความกดอากาศ 700 hpa", value: "wd700" },
        { text: "ความเร็วลมสูงสุดที่ระดับความสูง 10 เมตร", value: "ws10m" },
        { text: "ความเร็วลมสูงสุดที่ระดับความกดอากาศ 700 hpa", value: "ws700" },
      ],
      desert: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
      defaultItem: {
        id: "",
        title: "",
        description: "",
        published: false,
        createdAt: "",
      },
      timer: "",
      editedIndex: -1,
      snackbar: false,
      x: "right",
      y: "top",
      text: "ลบข้อมูลเรียบร้อย",
      timeout: 2000,
    };
  },
  methods: {
    dataApi() {
      axios({
        async: true,
        crossDomain: true,
        url: `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=สุรินทร์&amphoe=เมืองสุรินทร์&fields=rain,ws700,wd700,tc_max,tc_min,rh,cond,ws10m,wd10m,slp,psfc,cloudlow,cloudmed,cloudhigh,swdown&date=${this.query}&duration=126`,
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU1YjZiYzQ0NzlhOTE4YjJmNDQ0NDJjNzQ1MTViYzBkNTI5NTVjNzJjMzkxZjUyNTMwMTRkZjVkODRkNzVjM2ZkZmY3ZDhlMTkzOWU3NDcyIn0.eyJhdWQiOiIyIiwianRpIjoiNTViNmJjNDQ3OWE5MThiMmY0NDQ0MmM3NDUxNWJjMGQ1Mjk1NWM3MmMzOTFmNTI1MzAxNGRmNWQ4NGQ3NWMzZmRmZjdkOGUxOTM5ZTc0NzIiLCJpYXQiOjE2MjczMDQ1MDgsIm5iZiI6MTYyNzMwNDUwOCwiZXhwIjoxNjU4ODQwNTA4LCJzdWIiOiIxNTQyIiwic2NvcGVzIjpbXX0.ViZacdNFhr1CxH09ixbOOC9ocrohtoM_o0XyhepqgbcNUc_JodHZGiMzMYoniTcpHnUk1hSbY352RGiWpnJL9fXwNZGfeHTQU2xes9scInA03pH0TgffOjk9-xNyYtRJ1vnrhbop8MP-V_FaiX6oCyFMgPegjEAHgNArgoCtHjVr2BxCNhyP3SY4Wtw8g5D3rXx28ch3u3w7pkVZpAFEexZa-AMwXR1HwKYZY3kQTdDFmYt1ybM8f2S12ZfHVmB81ilxWGiwOE7QsXBsdA4Hw8GuMPpTgOSlNT818TR5KwSspZznqI2bqnuqSDj1F9Jw-KT2XBwROe16_gx0-k6VcOWWl4N1s23fKmlvmt21_ruXk1pu6aOJXigwgrNf9pOh2QQLsp1Aiqu7hV49q7B4mm55x9J4i3k0OfppJEXFLuYOWSVyphggas4k847tlBZk07yRaKzCywry5yW-W9R9S9-sF5dfuIQIWbJYxcgjPu4mn6cK64E2pq0tMbRW0gLrTP3XK1ChentB6SrGQiGeWwUQ3b_U60f0m5-rgybgKc6fFmf3cYxF99s-fIE8vJUF9fno_hiGry90PTs7VvbCN37-bu_8VgSXyq9fwTVgBwEDavUbBxuxAwDWdPVZ3PgoKH7V17S7xHYPYIuzNP9p-aT6_WSvwh67supULI3H7w8",
        },
      }).then((response) => {
        for (
          var i = 0;
          i < response.data.WeatherForecasts[0].forecasts.length;
          i++
        ) {
          // console.log(i);
          this.apiData[i] = response.data.WeatherForecasts[0].forecasts[i].data;
          this.date = response.data.WeatherForecasts[0].forecasts[i].time;
          // console.log(this.date);

          //   this.apiData.time[i] = response.data.WeatherForecasts[0].forecasts[i].time;
        }
        console.log(response);
        this.loader = true;
      });
    },
  },

  computed: {},
  mounted() {
    this.desert.fat = +1;
    this.dataApi();
  },
};
</script>
