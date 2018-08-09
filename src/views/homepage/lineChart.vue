<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题
import { debounce } from '@/utils'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    thisMonth: {
      type: Array,
      default: [0, 0, 0]
    },
    lastMonth: {
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
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    thisMonth() {
      this.updateChart(this.thisMonth, this.lastMonth)
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.updateChart(this.thisMonth, this.lastMonth)
    },
    updateChart(thisMonth, lastMonth) {
      this.chart.clear()
      this.chart.setOption({
        xAxis: {
          name: 'AAA',
          data: ['上旬', '中旬', '下旬'],
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(245, 247, 248, 0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#B4BAC6',
              width: '1'
            }
          }
        },
        grid: {
          left: 10,
          right: 10,
          top: 20,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(245, 247, 248,0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#B4BAC6',
              width: '1'
            }
          }
        },
        series: [{
          name: '本月',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#53A8E2',
              lineStyle: {
                color: '#53A8E2'
              }
            }
          },
          data: thisMonth,
          animationDuration: 2600,
          animationEasing: 'cubicInOut'
        },
        {
          name: '上月',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#ED6293',
              lineStyle: {
                color: '#ED6293'
              }
            }
          },
          data: lastMonth,
          animationDuration: 2000,
          animationEasing: 'quadraticOut'
        }]
      }, true)
    }
  }
}
</script>
