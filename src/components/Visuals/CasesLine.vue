<script>
import { Line } from "vue-chartjs";
// import { moment } from "moment-timezone"
export default {
  created() {},
  data() {
    return {
      intervalid1: "",
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                // beginAtZero: true,
                callback: function(value) {
                  return value + "c°";
                },
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
              type: "time",
              time: {
                tooltipFormat: "ll",
                unit: "day",
                unitStepSize: 1,
                locale:'TH',
                timezone: 'Asia/Bangkok',
                displayFormats: {
                  day: "ll",
                },
              },
            },
          ],
        },

        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "กราฟเส้น",
        },
      },
    };
  },
  methods: {
    get() {
      // console.log(this.chartLabels);
      this.renderChart(
        {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Min Data",
              data: this.chartData,
              fill: false,
              backgroundColor: "transparent",
              borderColor: "rgba(240,230,140, 1)",
              pointBackgroundColor: "rgba(255,140,0, 0.5)",
            },
            {
              label: "Max Data",
              data: this.chartData2,
              fill: false,
              backgroundColor: "transparent",
              borderColor: "rgba(255,140,0, 1)",
              pointBackgroundColor: "rgba(255,255,0, 0.5)",
            },
          ],
        },
        this.options
      );
    },
  },

  extends: Line,

  props: {
    chartData: {
      type: Array,
      required: true,
    },
    chartData2: {
      type: Array,
      required: true,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
    height: {},
  },
  mounted() {
    // this.intervalid1 = setInterval(function(){
    
    this.get();  

    //     console.log (this.get());
    // }.bind(this), 3000);
    // setInterval(this.get(),1000)
    // console.log(setInterval(this.get(),1000));
    // this.get()
  },
};
</script>
