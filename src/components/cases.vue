<template>
  <div>
    <today />
    <br />
    <v-row justify="space-between">
      <v-col cols="6" sm="8" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date11"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-col cols="12" md="8">
              <v-text-field
                v-model="dates"
                label="ระบุเวลาในการดูแผนภูมิข้อมูล"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </v-col>
          </template>
          <v-date-picker
            :min="days.min"
            :max="days.max"
            v-model="date11"
            range
            locale="TH-th"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              ยกเลิก
            </v-btn>
            <v-btn text color="primary" @click="requestData">
              ตกลง
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <!-- <v-col cols-md="6">
            <v-card>
              <line-chart
                :chart-labels="ChartData.date"
                :chart-data="ChartData.min"
                :chart-data2="ChartData.max"
                height="280"
              />
            </v-card>
          </v-col>-->
        <div class="text-center" v-if="!loadChart">
          <v-progress-circular
            :size="100"
            :width="8"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-col cols-md="6"
          ><v-btn color="indigo" small outlined v-on:click="getDataall">ทั้งหมด</v-btn>
          <v-card class="bg-card">
            <apexchart
              v-if="loaded && loadChart"
              type="line"
              height="350"
              :MaxData="ChartData.max"
              :MinData="ChartData.min"
              :Date="ChartData.date"
            ></apexchart>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col cols="12">
          <v-row>
            <v-col>
              <v-card>
                <CasesBar
                  :label="ChartData.date"
                  :maxTemp="ChartData.max"
                  :minTemp="ChartData.min"
                ></CasesBar>
              </v-card>
            </v-col>
          </v-row>
        </v-col> -->
    </v-row>
    <v-row> </v-row>

    <!-- <mbar></mbar> -->
  </div>
</template>

<script>
// import { format, parseISO } from "date-fns";
// const axios = require("axios");
import weatherDataService from "@/services/weatherDataService";
// import BarChart from "@/components/Visuals/CasesBar";
// import LineChart from "@/components/Visuals/CasesLine";
import apexchart from "@/components/Visuals/DoughnutChart";
// import AreaChart from "@/components/Visuals/area";
import today from "./weatherToday/today.vue";
// import DoughnutChart from "@/components/Visuals/DoughnutChart";
// import moment from "moment-timezone";
// import CaseBread from '@/components/HomePage/Breads/CaseBread'
export default {
  data: () => {
    return {
      setChart: 0,
      loadChart: false,
      menu: false,
      date11: "",
      date22: "",
      dates: [],
      dayz: "",
      selectedIndex: 5,
      days: {
        min: "",
        max: "",
        show: "",
      },
      value: null,
      day: "",
      query: "",
      city: "surin",
      country: "",
      intervalid1: "",
      datas: [],
      ChartData: {
        min: [],
        date: [],
        max: [],
      },
      loaded: false,
      showError: false,
      errorMessage: "เลือกวันที่ใหม่",
    };
  },
  methods: {
    async getDataall() {
      this.resetState();
      await weatherDataService
        .getAll()
        .then((response) => {
          this.days.min = response.data[0].date; //ช่วงเวลาที่เลือกได้น้อยที่สุด
          this.date11 = this.days.min; //จุดเริ่มต้นของปฎิทิน
          this.days.max = response.data[response.data.length - 1].date; //ช่วงเวลาที่เลือกได้มากที่สุด
          console.log(response.data[0]);
          //แสดงชาร์ท ไม่เกิน 100 - 150
          this.ChartData.min = response.data.map((entry) => entry.MinTemp);
          this.ChartData.max = response.data.map((entry) => entry.MaxTemp);
          this.ChartData.date = response.data.map((entry) => entry.date);
          this.loaded = true;
          
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    },
    resetState() {
      this.loaded = false;
    },
    requestData() {
      if (
        this.date11 === null ||
        this.date11 === "" ||
        this.date11 === "0000-00-00" ||
        this.date11 === "undefined"
      ) {
        this.showError = true;
        return;
      }
      this.resetState();
      weatherDataService
        .findDate(this.date11, this.date22)
        .then((response) => {
          this.ChartData.min = response.data.map((entry) => entry.MinTemp);
          this.ChartData.max = response.data.map((entry) => entry.MaxTemp);
          this.ChartData.date = response.data.map((entry) => entry.date);
          this.dates = [
            `ระหว่าง ${this.ChartData.date[0]} ถึง ${
              response.data[response.data.length - 1].date
            }`,
          ];
          this.menu = false;
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showChart() {
      this.loadChart = true;
    },
  },
  async created() {
    await weatherDataService
      .getAll()
      .then((response) => {
        this.days.min = response.data[0].date; //ช่วงเวลาที่เลือกได้น้อยที่สุด
        this.date11 = this.days.min; //จุดเริ่มต้นของปฎิทิน
        this.days.max = response.data[response.data.length - 1].date; //ช่วงเวลาที่เลือกได้มากที่สุด
        console.log(response.data[0]);
        //แสดงชาร์ท ไม่เกิน 100 - 150
        if (response.data.length > 100) {
          for (var i = 0; i < 60; i++) {
            this.ChartData.min.push(response.data[i].MinTemp);
            this.ChartData.max.push(response.data[i].MaxTemp);
            this.ChartData.date.push(response.data[i].date);
          }
        } else {
          this.ChartData.min = response.data.map((entry) => entry.MinTemp);
          this.ChartData.max = response.data.map((entry) => entry.MaxTemp);
          this.ChartData.date = response.data.map((entry) => entry.date);
        }

        // console.log(this.ChartData.date);
        this.loaded = true;
        // console.log(this.days.min, this.days.max);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  },
  props: {},
  components: {
    // LineChart,
    // BarChart,
    today,
    apexchart,
    // AreaChart,
    // CaseBread
  },

  computed: {},
  mounted() {
    this.setChart = setInterval(this.showChart, 1300);
    this.requestData();
  },
  beforeDestroy() {
    clearInterval(this.setChart);
  },
};
</script>
<style>
/* .bg-card{
  background-color: #6bf5b000 !important;
} */
#im {
  max-width: 30%;
  height: inherit;
}
#temp {
  border-radius: 10%;
  background: #b2fefa;
  background: -webkit-linear-gradient(to top, #0ed2f7, #b2fefa);
  background: linear-gradient(to top, #0ed2f7, #b2fefa);
  font-variant-caps: all-small-caps;
}
#small {
  font-size: 10px;
  color: #f8981d;
}
</style>
