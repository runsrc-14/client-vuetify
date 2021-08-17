
<script>
import { Bar } from "vue-chartjs";

export default {
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
    height:{}
  },
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#fb9300",
            data: this.chartData,
          },
          {
            label: "Data One",
            backgroundColor: "#ffed99",
            data: this.chartData2,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
