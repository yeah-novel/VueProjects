const BAROPTION = {
  title: {
    textStyle: {              // 标题文本样式
      color: '#fff',          // 文字颜色
      fontSize: 18,           // 字体大小
      fontWeight: 'bold',     // 字体粗细
      fontFamily: 'Arial'     // 字体类型
    },
  },
  textStyle: {
    color: '#fff',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend:  {
    textStyle: {
      color: '#fff',          // 文字颜色
      fontSize: 10,           // 字体大小
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: {
        focus: 'series'
      },
      markLine: {
        lineStyle: {
          type: 'dashed'
        },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    }
  ]
}

const MAPOPTION = {
    //标题配置
    title: {
      text: '中国地图',          // 主标题文本
      subtext: '数据仅供参考',   // 副标题文本
      left: 'center',           // 水平位置 (left|center|right|百分比|像素值)
      top: 'top',               // 垂直位置 (top|middle|bottom|百分比|像素值)
      textStyle: {              // 标题文本样式
        color: '#fff',          // 文字颜色
        fontSize: 18,           // 字体大小
        fontWeight: 'bold',     // 字体粗细
        fontFamily: 'Arial'     // 字体类型
      },
      subtextStyle: {           // 副标题样式
        color: '#fff',
        fontSize: 12
      }
    },
    // 提示框配置
    tooltip: {
      trigger: 'item',          // 触发类型 (item|axis)
      formatter: '{b}',    // 格式化显示内容
      // {a}系列名, {b}区域名, {c}数值
      backgroundColor: 'rgba(0,0,0,0.7)',  // 背景色
      borderColor: '#333',      // 边框颜色
      borderWidth: 1,           // 边框宽度
      textStyle: {              // 文本样式
        color: '#fff',
        fontSize: 12
      },
      padding: [8, 12],         // 内边距
      extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);' // 额外CSS样式
    },
    // 视觉映射组件
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: {
        color: ['#e0f7fa', '#009688']
      }
    },
    // 地图系列配置
    series: [{
      name: '中国地图',         // 系列名称
      type: 'map',             // 图表类型
      map: 'china',            // 地图类型 (需提前registerMap)
      roam: false,              // 是否开启缩放和平移
      scaleLimit: {            // 缩放限制
        min: 1,                // 最小缩放级别
        max: 5                 // 最大缩放级别
      },
      zoom: 1.5,               // 初始缩放级别
      center: [105, 36],       // 初始中心点坐标 [经度, 纬度]

      // 标签配置
      label: {
        show: true,            // 是否显示标签
        position: 'inside',    // 位置 (inside|top|bottom|left|right)
        color: '#f0f0f0',        // 文字颜色
        fontSize: 8,         // 字体大小
        fontWeight: 'normal', // 字体粗细
        formatter: '{b}'      // 标签内容格式
      },

      // 区域样式
      itemStyle: {
        areaColor: '#1E90FF',  // 区域填充色
        borderColor: '#00BFFF', // 边界线颜色
        borderWidth: 1,        // 边界线宽度
        borderType: 'solid',   // 边界线类型 (solid|dashed|dotted)
        shadowColor: 'rgba(0, 0, 0, 0.1)', // 阴影颜色
        shadowBlur: 2,        // 阴影模糊大小
        shadowOffsetX: 0,      // 阴影水平偏移
        shadowOffsetY: 0       // 阴影垂直偏移
      },

      // 高亮状态样式
      emphasis: {
        label: {               // 高亮时标签样式
          show: true,
          color: '#fff',
          fontSize: 10
        },
        itemStyle: {          // 高亮时区域样式
          areaColor: '#4db6ac',
          borderWidth: 1
        }
      },

      // 选中状态样式
      select: {
        label: {
          show: true,
          color: '#fff'
        },
        itemStyle: {
          areaColor: '#2E8B57'
        }
      },

      // 数据内容 (可选)
      data: [
        {name: '北京', value: 100},
        {name: '上海', value: 80},
        // 其他省份数据...
      ]
    }]
  }

const RADAROPTION = {
  title: {
    textStyle: {              // 标题文本样式
      color: '#fff',          // 文字颜色
      fontSize: 14,           // 字体大小
      fontWeight: 'bold',     // 字体粗细
      fontFamily: 'Arial'     // 字体类型
    },
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
    textStyle: {
      color: '#fff',          // 文字颜色
      fontSize: 8,           // 字体大小
    }
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ],
    // 图形位置与大小
    center: ['50%', '50%'],       // 圆心位置（百分比/像素）
    radius: '65%',                // 半径（百分比/像素/[内径,外径]）

    // 坐标轴样式
    startAngle: 90,               // 起始角度（0为3点钟方向，90为12点钟方向）
    splitNumber: 5,               // 同心圆分割段数
    shape: 'polygon',             // 网格形状：'polygon'（多边形）| 'circle'（圆形）
    scale: true,                  // 是否启用数值缩放（适应数据范围）

    // 轴线样式
    axisLine: {
      show: true,                 // 是否显示轴线
      lineStyle: { color: '#aaa' }
    },
    // 分割线样式
    splitLine: {
      show: true,
      lineStyle: { color: '#eee' }
    },

    // 区域填充（同心圆背景）
    splitArea: {
      show: true,
      areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] }
    },
    // 指示器名称样式
    axisName: {
      show: true,
      color: '#fff',
      padding: [0, -8]           // 文字与轴线的距离
    }
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget',
          symbol: 'circle',        // 数据点标记：'circle', 'rect', 'diamond'...
          symbolSize: 5,          // 标记大小
          lineStyle: { width: 2, color: '#FF483D' }, // 线条样式
          // areaStyle: { opacity: 0.5 } // 填充区域样式
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending',
          symbol: 'circle',        // 数据点标记：'circle', 'rect', 'diamond'...
          symbolSize: 5,          // 标记大小
          lineStyle: { width: 2, color: '#06F7A1' }, // 线条样式
        }
      ],
      lineStyle: { width: 1.5, type: 'solid' },
      // areaStyle: {},               // 默认不填充，需显式设置
      symbol: 'emptyCircle',       // 默认空心圆
      // symbolSize: 6,
    }
  ]
}

const GAUGEOPTIO = {
   series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 60,
      splitNumber: 1,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 10
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 10
        }
      },
      axisTick: {
        distance: -10,
        splitNumber: 1,
        lineStyle: {
          width: 1,
          color: '#ffffffff'
        }
      },
      splitLine: {
        distance: -10,
        length: 14,
        lineStyle: {
          width: 0,
          color: '#ffffffff'
        }
      },
      axisLabel: {
        distance: -30,
        color: '#ffffffff',
        fontSize: 14
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '100%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '40%'],
        fontSize: 30,
        fontWeight: 'bolder',
        formatter: '{value} °C',
        color: 'inherit'
      },
      data: [
        {
          value: 20
        }
      ]
    },
  ]
}

export {BAROPTION, MAPOPTION, RADAROPTION, GAUGEOPTIO}

