<template>
  <apexchart
    type="line"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  props: {
    MaxData: {
      type: Array,
      required: true,
    },
    MinData: {
      type: Array,
      required: true,
    },
    Date: {
      type: Array,
      required: true,
    },
  },
  // components: {
  //   apexchart: VueApexCharts,
  // },
  data() {
    return {
      series: [
        {
          name: "อุณหภูมิสูงสุด",
          data: this.MaxData,
        },
        {
          name: "อุณหภูมิต่ำสุด",
          data: this.MinData,
        },
      ],
      chartOptions: {
        chart: {
          locale: "TH",
          foreColor: "#6D6D6D",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          // toolbar: {
          //   autoSelected: "zoom",
          // },
        },
        colors: ["#E65100", "#FFCC80"],
        // dataLabels: {
        //   enabled: true,
        // },
        stroke: {
          show: true,
          curve: "smooth",
          // lineCap: "butt",
          // colors: undefined,
          // width: 4,
          // dashArray: 0,
        },
        title: {
          text: "อุณหภูมิ สูงสุด-ต่ำสุด",
          align: "left",
        },
        grid: {
          borderColor: null,
          // borderColor: "#6D6D6D",
          // row: {
          //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          //   opacity: 0.5,
          // },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          labels: {
            format: "dd-MMM-yy",
          },
          categories: this.Date,
          type: "datetime",
          title: {
            text: "วันที่",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FFA796"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        yaxis: {
          title: {
            text: "อุณหภูมิ",
          },
          min: -6,
          max: 40,
        },
        legend: {
          position: "bottom",
          // horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  },
};
</script>
