<template>
  <div class="bg">
    <div class="head">
      <img class="img" src="/img/portrait.png" alt />
      <span class="name">Andy</span>
    </div>
    <div class="score" ref="analysis"></div>
  </div>
</template>

<script>
const echarts = require("echarts");

export default {
  name: "Analysis",
  data() {
    return {
      myChart: null
    };
  },
  method: {
    myRandom() {
      return Math.ceil(Math.random());
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.analysis);
    var option = {
      radar: [
        {
          indicator: [
            { name: "观察", max: 5 },
            { name: "想象", max: 5 },
            { name: "分析", max: 5 },
            { name: "实践", max: 5 },
            { name: "创造", max: 5 }
          ],
          center: ['25%','50%'],
          // radius: 80
        },
        {
          indicator: [
            { name: "逻辑思维", max: 5 },
            { name: "综合思维", max: 5 },
            { name: "推理思维", max: 5 },
            { name: "计算思维", max: 5 },
            { name: "抽象思维", max: 5 }
          ],
          center: ['75%','50%'],
          // radius: 80
        }
      ],
      series: [
        {
          type: "radar",
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [
            {
              value: [
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5)
              ]
            }
          ]
        },
        {
          type: "radar",
          radarIndex: 1,
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [
            {
              value: [
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5),
                Math.ceil(Math.random() * 5)
              ]
            }
          ]
        }
      ]
    };
    this.myChart.setOption(option);
  }
};
</script>

<style scoped>
.bg {
  height: calc(100% - 1px);
  width: 100%;
  background-color: #becee9;
  padding-top: 1px;
}

.head {
  height: 180px;
  margin: 40px;
}

.img {
  height: 180px;
  width: 160px;
  vertical-align: middle;
}

.name {
  font-size: 40px;
  color: #1eaeff;
}

.score {
  width: 100%;
  height: calc(100vh - 261px);
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}
</style>