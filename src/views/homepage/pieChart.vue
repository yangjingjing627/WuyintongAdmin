<template>
  <div :class="className" :style="{height:height,width:width}" :statictis="statictis"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    statictis: {
      type: Array,
      default: [0, 0, 0]
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    statictis(val) {
      this.updateChart(val)
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.updateChart(this.statictis)
    },
    updateChart(statictis) {
      this.chart.clear()
      this.chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '30',
          right: '43',
          itemWidth: 9,
          itemHeight: 9,
          orient: 'vertical',
          selectedMode: false,
          icon: 'circle',
          data: ['通过率', '拒审率', '贷款申请'],
          textStyle: {
            fontSize: 14,
            color: '#B4BAC6'
          }
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            radius: [45, 79],
            label: {
              normal: {
                show: true,
                position: 'inner',
                textStyle: {
                  fontSize: '12',
                  color: '#fff'
                },
                formatter: '{d}%'
              },
              emphasis: {
                show: true,
                position: 'inner',
                textStyle: {
                  fontSize: '12',
                  color: '#fff'
                },
                formatter: '{d}%'
              }
            },
            center: [200, 100],
            color: ['#8D5AF9', '#FD738D', '#4298F4'],
            data: [
              { value: statictis[0], name: '通过率' },
              { value: statictis[1], name: '拒审率' },
              { value: statictis[2], name: '贷款申请' }
            ]
          }
        ]
      }, true)
    }
  }
}
</script>
