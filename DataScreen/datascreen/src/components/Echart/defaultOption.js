import echarts from '../../plugins/echarts'
const BAROPTION = {
  title: {
    textStyle: { // 标题文本样式
      color: '#fff', // 文字颜色
      fontSize: 18, // 字体大小
      fontWeight: 'bold', // 字体粗细
      fontFamily: 'Arial' // 字体类型
    }
  },
  textStyle: {
    color: '#fff'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: '20px',
    textStyle: {
      color: '#fff', // 文字颜色
      fontSize: 10 // 字体大小
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      axisLabel: {
        color: '#fff'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '#fff'
      }
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
  // 标题配置
  title: {
    text: '中国地图', // 主标题文本
    subtext: '数据仅供参考', // 副标题文本
    left: 'center', // 水平位置 (left|center|right|百分比|像素值)
    top: 'top', // 垂直位置 (top|middle|bottom|百分比|像素值)
    textStyle: { // 标题文本样式
      color: '#fff', // 文字颜色
      fontSize: 18, // 字体大小
      fontWeight: 'bold', // 字体粗细
      fontFamily: 'Arial' // 字体类型
    },
    subtextStyle: { // 副标题样式
      color: '#fff',
      fontSize: 12
    }
  },
  // 提示框配置
  tooltip: {
    trigger: 'item', // 触发类型 (item|axis)
    formatter: '{b}', // 格式化显示内容
    // {a}系列名, {b}区域名, {c}数值
    backgroundColor: 'rgba(0,0,0,0.7)', // 背景色
    borderColor: '#333', // 边框颜色
    borderWidth: 1, // 边框宽度
    textStyle: { // 文本样式
      color: '#fff',
      fontSize: 12
    },
    padding: [8, 12], // 内边距
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
    name: '中国地图', // 系列名称
    type: 'map', // 图表类型
    map: 'china', // 地图类型 (需提前registerMap)
    roam: false, // 是否开启缩放和平移
    scaleLimit: { // 缩放限制
      min: 1, // 最小缩放级别
      max: 5 // 最大缩放级别
    },
    zoom: 1.5, // 初始缩放级别
    center: [105, 36], // 初始中心点坐标 [经度, 纬度]

    // 标签配置
    label: {
      show: true, // 是否显示标签
      position: 'inside', // 位置 (inside|top|bottom|left|right)
      color: '#f0f0f0', // 文字颜色
      fontSize: 8, // 字体大小
      fontWeight: 'normal', // 字体粗细
      formatter: '{b}' // 标签内容格式
    },

    // 区域样式
    itemStyle: {
      areaColor: '#1E90FF', // 区域填充色
      borderColor: '#00BFFF', // 边界线颜色
      borderWidth: 1, // 边界线宽度
      borderType: 'solid', // 边界线类型 (solid|dashed|dotted)
      shadowColor: 'rgba(0, 0, 0, 0.1)', // 阴影颜色
      shadowBlur: 2, // 阴影模糊大小
      shadowOffsetX: 0, // 阴影水平偏移
      shadowOffsetY: 0 // 阴影垂直偏移
    },

    // 高亮状态样式
    emphasis: {
      label: { // 高亮时标签样式
        show: true,
        color: '#fff',
        fontSize: 10
      },
      itemStyle: { // 高亮时区域样式
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
      {name: '上海', value: 80}
      // 其他省份数据...
    ]
  }]
}

const RADAROPTION = {
  title: {
    textStyle: { // 标题文本样式
      color: '#fff', // 文字颜色
      fontSize: 14, // 字体大小
      fontWeight: 'bold', // 字体粗细
      fontFamily: 'Arial' // 字体类型
    }
  },
  legend: {
    top: '0px',
    data: ['Allocated Budget', 'Actual Spending'],
    textStyle: {
      color: '#fff', // 文字颜色
      fontSize: 8 // 字体大小
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
    center: ['50%', '50%'], // 圆心位置（百分比/像素）
    radius: '65%', // 半径（百分比/像素/[内径,外径]）

    // 坐标轴样式
    startAngle: 90, // 起始角度（0为3点钟方向，90为12点钟方向）
    splitNumber: 5, // 同心圆分割段数
    shape: 'polygon', // 网格形状：'polygon'（多边形）| 'circle'（圆形）
    scale: true, // 是否启用数值缩放（适应数据范围）

    // 轴线样式
    axisLine: {
      show: true, // 是否显示轴线
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
      padding: [0, -8] // 文字与轴线的距离
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
          symbol: 'circle', // 数据点标记：'circle', 'rect', 'diamond'...
          symbolSize: 5, // 标记大小
          lineStyle: { width: 2, color: '#FF483D' } // 线条样式
          // areaStyle: { opacity: 0.5 } // 填充区域样式
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending',
          symbol: 'circle', // 数据点标记：'circle', 'rect', 'diamond'...
          symbolSize: 5, // 标记大小
          lineStyle: { width: 2, color: '#06F7A1' } // 线条样式
        }
      ],
      lineStyle: { width: 1.5, type: 'solid' },
      // areaStyle: {},               // 默认不填充，需显式设置
      symbol: 'emptyCircle' // 默认空心圆
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
    }
  ]
}

const SCREEN_ANIMATION = {
  animation: true,
  animationDuration: 1800,
  animationEasing: 'cubicOut',
  animationDurationUpdate: 1200,
  animationEasingUpdate: 'cubicInOut'
}

const SEMI_GAUGE_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2200,
  series: [{
    type: 'gauge',
    center: ['50%', '75%'],
    radius: '90%',
    startAngle: 180,
    endAngle: 0,
    min: 0,
    max: 100,
    splitNumber: 1,
    itemStyle: { color: '#4dd0e1' },
    progress: {
      show: true,
      width: 14,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#1e5a9e' },
            { offset: 1, color: '#4dd0e1' }
          ]
        }
      }
    },
    pointer: { show: false },
    axisLine: {
      lineStyle: {
        width: 14,
        color: [[1, 'rgba(30, 80, 160, 0.35)']]
      }
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: {
      distance: -22,
      color: 'rgba(255,255,255,0.6)',
      fontSize: 11,
      formatter: function (val) {
        if (val === 0) return '0%'
        if (val === 100) return '100%'
        return ''
      }
    },
    title: { show: false },
    detail: {
      valueAnimation: true,
      offsetCenter: [0, '-5%'],
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      formatter: '{value}%\nwhat you need'
    },
    data: [{ value: 86 }]
  }]
}

const SAFETY_RING_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2000,
  series: [{
    type: 'gauge',
    center: ['50%', '55%'],
    radius: '85%',
    startAngle: 225,
    endAngle: -45,
    min: 0,
    max: 10,
    splitNumber: 0,
    itemStyle: { color: '#4dd0e1' },
    progress: {
      show: true,
      width: 10,
      roundCap: true,
      itemStyle: { color: '#4dd0e1' }
    },
    pointer: { show: false },
    axisLine: {
      roundCap: true,
      lineStyle: {
        width: 10,
        color: [[1, 'rgba(30, 80, 160, 0.4)']]
      }
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    title: {
      show: true,
      offsetCenter: [0, '30%'],
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)',
      fontWeight: 'normal'
    },
    detail: {
      valueAnimation: true,
      offsetCenter: [0, '-5%'],
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
      formatter: '{value}'
    },
    data: [{ value: 9.3, name: 'Safety\nTotal Score' }]
  }]
}

const SCREEN_BAR_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 1600,
  animationEasing: 'elasticOut',
  grid: {
    left: '8%',
    right: '4%',
    top: '18%',
    bottom: '12%',
    containLabel: false
  },
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 11
    }
  },
  yAxis: {
    type: 'value',
    show: false,
    max: 110
  },
  series: [{
    type: 'bar',
    animationDelay: function (idx) {
      return idx * 120
    },
    data: [
      { value: 20, itemStyle: { color: '#8fa8c8' } },
      { value: 10, itemStyle: { color: '#6eb5e0' } },
      { value: 45, itemStyle: { color: '#8fa8c8' } },
      { value: 75, itemStyle: { color: '#6eb5e0' } },
      { value: 100, itemStyle: { color: '#8fa8c8' } },
      { value: 55, itemStyle: { color: '#6eb5e0' } },
      { value: 85, itemStyle: { color: '#8fa8c8' } },
      { value: 40, itemStyle: { color: '#6eb5e0' } }
    ],
    barWidth: '42%',
    itemStyle: { borderRadius: [6, 6, 0, 0] },
    emphasis: {
      itemStyle: {
        shadowBlur: 14,
        shadowColor: 'rgba(77, 208, 225, 0.55)'
      }
    },
    label: {
      show: true,
      position: 'top',
      color: '#fff',
      fontSize: 11,
      formatter: '{c}%'
    },
    markLine: {
      silent: true,
      symbol: ['none', 'none'],
      lineStyle: {
        type: 'dotted',
        color: 'rgba(255,255,255,0.35)',
        width: 1
      },
      data: [{ yAxis: 0 }],
      label: { show: false }
    }
  }]
}

const SCREEN_PIE_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 1400,
  animationEasing: 'cubicOut',
  color: ['#6eb5e0', '#f5a623', '#9b7fd4', '#5cb87a'],
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 14,
    textStyle: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 12
    },
    formatter: function (name) {
      const map = {
        "It's Your Style!": "It's Your Style!",
        'Professional!': 'Professional!',
        'Cloud System!': 'Cloud System!',
        'Consulting!': 'Consulting!'
      }
      return map[name] || name
    }
  },
  series: [{
    type: 'pie',
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return idx * 180
    },
    radius: ['0%', '55%'],
    center: ['38%', '50%'],
    roseType: false,
    itemStyle: {
      borderRadius: 4,
      borderColor: 'rgba(26, 58, 107, 0.8)',
      borderWidth: 2
    },
    label: {
      show: true,
      position: 'inside',
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
      formatter: '{d}%'
    },
    labelLine: { show: false },
    emphasis: {
      scale: true,
      scaleSize: 10,
      itemStyle: {
        shadowBlur: 12,
        shadowColor: 'rgba(0, 0, 0, 0.35)'
      }
    },
    data: [
      { value: 11, name: 'S级' },
      { value: 12, name: 'A级' },
      { value: 35, name: 'B级' },
      { value: 32, name: 'C级' },
      { value: 10, name: 'D级' }
    ]
  }]
}

const SCREEN_RADAR_OPTION = {
  ...SCREEN_ANIMATION,
  radar: {
    center: ['50%', '52%'],
    radius: '58%',
    startAngle: 90,
    splitNumber: 5,
    shape: 'polygon',
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
    splitArea: {
      areaStyle: {
        color: ['rgba(12,34,85,0.05)', 'transparent']
      }
    },
    indicator: [
      { name: '注意力', max: 180 },
      { name: '自控力', max: 120 },
      { name: '记忆力', max: 120 },
      { name: '反应力', max: 180 },
      { name: '思维力', max: 180 }
    ],
    axisName: { color: '#fff', fontSize: 12 }
  },
  tooltip: { show: false },
  series: [{
    type: 'radar',
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(57, 171, 255, 0.45)' },
          { offset: 1, color: 'rgba(93, 255, 232, 0.18)' }
        ]
      }
    },
    lineStyle: { color: '#4bd3ff', width: 2 },
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: { color: '#4bd3ff' },
    data: [
      {
        value: [128, 59, 64, 154, 158],
        name: '学习力雷达'
      }
    ]
  }]
}

const SCREEN_LINE_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2200,
  animationEasing: 'cubicInOut',
  grid: {
    left: '6%',
    right: '4%',
    top: '12%',
    bottom: '18%',
    containLabel: true
  },
  legend: {
    bottom: '2%',
    left: 'center',
    itemWidth: 20,
    itemHeight: 2,
    textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
    data: ['S1', 'S2']
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 6,
    splitNumber: 6,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }
  },
  series: [
    {
      name: 'S1',
      type: 'line',
      smooth: true,
      animationDelay: 0,
      symbol: 'circle',
      symbolSize: 6,
      showSymbol: false,
      lineStyle: { color: 'rgba(255,255,255,0.85)', width: 2 },
      itemStyle: { color: '#fff' },
      emphasis: {
        focus: 'series',
        lineStyle: { width: 3 },
        itemStyle: { borderWidth: 2, borderColor: '#fff' }
      },
      data: [2.5, 3.2, 2.8, 3.5, 4.0, 3.8, 4.5, 3.2, 4.8, 3.5, 4.2, 3.0]
    },
    {
      name: 'S2',
      type: 'line',
      smooth: true,
      animationDelay: 400,
      symbol: 'circle',
      symbolSize: 6,
      showSymbol: false,
      lineStyle: { color: '#4dd0e1', width: 2 },
      itemStyle: { color: '#4dd0e1' },
      emphasis: {
        focus: 'series',
        lineStyle: { width: 3 }
      },
      data: [1.8, 2.5, 3.0, 1.5, 2.8, 5.2, 4.0, 3.5, 4.5, 3.8, 2.5, 3.2],
      markPoint: {
        symbol: 'roundRect',
        symbolSize: [50, 28],
        symbolOffset: [0, -20],
        animation: true,
        animationDuration: 800,
        animationDelay: 2000,
        animationEasing: 'elasticOut',
        itemStyle: { color: '#4dd0e1', borderRadius: 6 },
        label: {
          color: '#0a2a5e',
          fontSize: 11,
          fontWeight: 'bold',
          formatter: '{c}%'
        },
        data: [
          { name: 'dip', coord: ['Q4', 1.5], value: '21%' },
          { name: 'peak', coord: ['Q6', 5.2], value: '54%', itemStyle: { color: '#1a6b8a' }, label: { color: '#fff' } }
        ]
      }
    }
  ]
}

// const SCREEN_PIE_OPTION_2 = {
//   ...SCREEN_ANIMATION,
//   animationDuration: 1400,
//   animationEasing: 'cubicOut',
//   color: ['#1F8BFF', '#26D7D0', '#F5A623', '#8B6DF5', '#32D176', '#FF5F5F'],
//   tooltip: {
//     trigger: 'item',
//     formatter: '{b}<br/>{c} ({d}%)',
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//     textStyle: {
//       color: '#fff',
//       fontSize: 12
//     }
//   },
//   legend: {
//     show: false
//   },
//   series: [{
//     type: 'pie',
//     animationType: 'scale',
//     animationEasing: 'elasticOut',
//     animationDelay: function (idx) {
//       return idx * 180
//     },
//     radius: ['45%', '65%'],
//     center: ['50%', '48%'],
//     avoidLabelOverlap: false,
//     hoverOffset: 12,
//     itemStyle: {
//       borderRadius: 8,
//       borderColor: 'rgba(10, 24, 54, 0.85)',
//       borderWidth: 2,
//       shadowBlur: 18,
//       shadowColor: 'rgba(0, 0, 0, 0.35)'
//     },
//     label: {
//       show: true,
//       position: 'outside',
//       color: '#fff',
//       fontSize: 12,
//       lineHeight: 18,
//       formatter: '{b}\n{d}%'
//     },
//     labelLine: {
//       show: true,
//       length: 18,
//       length2: 8,
//       lineStyle: {
//         color: 'rgba(255,255,255,0.55)',
//         width: 1
//       }
//     },
//     emphasis: {
//       scale: true,
//       scaleSize: 14,
//       itemStyle: {
//         shadowBlur: 18,
//         shadowColor: 'rgba(0, 0, 0, 0.45)'
//       }
//     },
//     data: [
//       { value: 20, name: 'S级' },
//       { value: 28, name: 'A级' },
//       { value: 18, name: 'B级' },
//       { value: 15, name: 'C级' },
//       { value: 12, name: 'D级' },
//       { value: 7, name: 'E级' }
//     ]
//   }]
// }

// ---------- 3D 饼图配置 ----------
const SCREEN_PIE_OPTION_2 = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
    backgroundColor: 'rgba(30,30,50,0.9)',
    borderColor: '#4fc3f7',
    textStyle: { color: '#fff' }
  },
  legend: {
    orient: 'vertical',
    right: 20,
    top: 'center',
    textStyle: { color: '#ccc', fontSize: 13 },
    itemWidth: 14,
    itemHeight: 14,
    data: ['产品 A', '产品 B', '产品 C', '产品 D', '产品 E', '产品 F']
  },
  series: [
    // ===== 底层：厚度阴影层（向左下偏移） =====
    {
      name: '厚度层',
      type: 'pie',
      z: 1,
      radius: ['30%', '70%'],
      center: ['48%', '52%'],
      label: { show: false },
      labelLine: { show: false },
      silent: true,
      animation: false,
      avoidLabelOverlap: false,
      data: [
        { name: 'S级', value: 335, itemStyle: { color: '#1F8BFF' } },
        { name: 'A级', value: 310, itemStyle: { color: '#26D7D0' } },
        { name: 'B级', value: 234, itemStyle: { color: '#F5A623' } },
        { name: 'C级', value: 135, itemStyle: { color: '#8B6DF5' } },
        { name: 'D级', value: 548, itemStyle: { color: '#32D176' } },
        { name: 'E级', value: 148, itemStyle: { color: '#FF5F5F' } }
      ]
    },
    // ===== 上层：主饼图（带径向渐变高光） =====
    {
      name: '主饼图',
      type: 'pie',
      z: 2,
      radius: ['30%', '70%'],
      center: ['50%', '50%'],
      label: {
        show: true,
        position: 'outer',
        formatter: '{b}\n{d}%',
        color: '#eee',
        fontSize: 12,
        fontWeight: '500',
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowBlur: 4
      },
      labelLine: {
        show: true,
        length: 12,
        length2: 18,
        lineStyle: { color: '#666', width: 1.5 }
      },
      emphasis: {
        scale: true,
        scaleSize: 8,
        label: { fontWeight: 'bold', fontSize: 14, color: '#fff' },
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255,255,255,0.4)',
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      avoidLabelOverlap: true,
      animationDuration: 1200,
      animationEasing: 'cubicOut',
      hoverAnimation: true,
      data: [
        {
          name: 'A级',
          value: 335,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.3, 0.3, 0.7, [
              { offset: 0, color: '#fff' },
              { offset: 0.3, color: '#2196f3' },
              { offset: 0.8, color: '#0d47a1' },
              { offset: 1, color: '#002171' }
            ]),
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        {
          name: 'B级',
          value: 310,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.3, 0.3, 0.7, [
              { offset: 0, color: '#fff' },
              { offset: 0.3, color: '#00bcd4' },
              { offset: 0.8, color: '#006064' },
              { offset: 1, color: '#00363a' }
            ]),
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        {
          name: 'C级',
          value: 234,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.3, 0.3, 0.7, [
              { offset: 0, color: '#fff' },
              { offset: 0.3, color: '#e7b853' },
              { offset: 0.8, color: '#d6a315' },
              { offset: 1, color: '#6e540d' }
            ]),
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        {
          name: 'D级',
          value: 135,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.3, 0.3, 0.7, [
              { offset: 0, color: '#fff' },
              { offset: 0.3, color: '#9c27b0' },
              { offset: 0.8, color: '#4a148c' },
              { offset: 1, color: '#12005e' }
            ]),
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        {
          name: 'E级',
          value: 548,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.3, 0.3, 0.7, [
              { offset: 0, color: '#fff' },
              { offset: 0.3, color: '#4caf50' },
              { offset: 0.8, color: '#1b5e20' },
              { offset: 1, color: '#003300' }
            ]),
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        {
          name: 'F级',
          value: 148,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.3, 0.3, 0.7, [
              { offset: 0, color: '#fff' },
              { offset: 0.3, color: '#ff9800' },
              { offset: 0.8, color: '#e65100' },
              { offset: 1, color: '#bf3600' }
            ]),
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        }
      ]
    }
  ],
  // 中心装饰光效
  graphic: [
    {
      type: 'circle',
      shape: { cx: '50%', cy: '50%', r: 12 },
      style: {
        fill: 'rgba(255,255,255,0.2)',
        shadowBlur: 40,
        shadowColor: 'rgba(255,255,255,0.5)'
      },
      z: 100,
      left: '48.5%',
      top: '47.5%'
    }
  ]
}

const SCREEN_AREA_STACK_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2000,
  animationEasing: 'cubicOut',
  grid: {
    left: '6%',
    right: '6%',
    top: '12%',
    bottom: '18%',
    containLabel: true
  },
  legend: {
    bottom: '6%',
    left: 'center',
    textStyle: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
    itemGap: 20
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }
  },
  tooltip: { trigger: 'axis' },
  series: [
    {
      name: 'Product A',
      type: 'line',
      smooth: true,
      showSymbol: false,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [ { offset: 0, color: 'rgba(71,130,255,0.9)' }, { offset: 1, color: 'rgba(71,130,255,0.06)' } ]
        }
      },
      lineStyle: { color: '#477FFF', width: 2 },
      itemStyle: { color: '#477FFF' },
      data: [2.8, 3.4, 3.0, 3.8, 4.2, 3.6, 4.1, 3.7, 4.4, 3.9, 4.6, 4.0]
    },
    {
      name: 'Product B',
      type: 'line',
      smooth: true,
      showSymbol: false,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [ { offset: 0, color: 'rgba(249,151,151,0.9)' }, { offset: 1, color: 'rgba(249,151,151,0.06)' } ]
        }
      },
      lineStyle: { color: '#F99797', width: 2 },
      itemStyle: { color: '#F99797' },
      data: [1.6, 2.1, 1.9, 2.6, 2.9, 2.4, 3.0, 2.7, 3.2, 2.8, 3.4, 3.0]
    }
  ]
}

const SCREEN_MIX_BAR_LINE = {
  ...SCREEN_ANIMATION,
  animationDuration: 1800,
  animationEasing: 'cubicOut',
  grid: {
    left: '8%',
    right: '6%',
    top: '18%',
    bottom: '14%',
    containLabel: true
  },
  legend: {
    top: '4%',
    left: 'center',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: { color: 'rgba(255,255,255,0.85)', fontSize: 11 },
    itemGap: 16,
    data: [
      { name: '新增项目', icon: 'roundRect' },
      { name: '储备项目', icon: 'roundRect' },
      { name: '转化率', icon: 'circle' }
    ]
  },
  xAxis: {
    type: 'category',
    data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 11,
      fontWeight: 'bold'
    },
    splitLine: { show: false }
  },
  yAxis: [
    {
      type: 'value',
      name: '',
      min: 0,
      max: 50,
      splitNumber: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        formatter: '{value}'
      },
      splitLine: {
        lineStyle: { color: 'rgba(255,255,255,0.06)', type: 'dashed' }
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(10,30,60,0.9)',
    borderColor: 'rgba(79,195,247,0.3)',
    textStyle: { color: '#fff', fontSize: 12 }
  },
  series: [
    {
      name: '新增项目',
      type: 'bar',
      barWidth: '22%',
      barGap: '15%',
      animationDelay: function (idx) { return idx * 120 },
      itemStyle: {
        borderRadius: [3, 3, 0, 0],
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#4dd0e1' },
            { offset: 1, color: '#26a8b8' }
          ]
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(77,208,225,0.5)'
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#4dd0e1',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: '{c}%'
      },
      data: [45, 28, 32, 40, 35]
    },
    {
      name: '储备项目',
      type: 'bar',
      barWidth: '22%',
      barGap: '15%',
      animationDelay: function (idx) { return idx * 120 + 150 },
      itemStyle: {
        borderRadius: [3, 3, 0, 0],
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#3b7bfd' },
            { offset: 1, color: '#1a4fa0' }
          ]
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(59,123,253,0.5)'
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#6b9bff',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: '{c}%'
      },
      data: [38, 22, 26, 33, 29]
    },
    {
      name: '转化率',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      animationDelay: 600,
      lineStyle: { color: '#ff9800', width: 2.5 },
      itemStyle: {
        color: '#ff9800',
        borderColor: '#fff',
        borderWidth: 1.5
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255,152,0,0.25)' },
            { offset: 1, color: 'rgba(255,152,0,0.02)' }
          ]
        }
      },
      emphasis: {
        focus: 'series',
        lineStyle: { width: 3.5 },
        itemStyle: { borderWidth: 2.5 }
      },
      label: {
        show: true,
        position: 'top',
        color: '#ff9800',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: '{c}%'
      },
      data: [72, 37, 47, 24, 39]
    }
  ]
}

const SCREEN_HORIZ_STACK_BAR = {
  ...SCREEN_ANIMATION,
  animationDuration: 1500,
  animationEasing: 'cubicOut',
  grid: {
    left: '12%',
    right: '8%',
    top: '16%',
    bottom: '10%',
    containLabel: false
  },
  legend: {
    top: '3%',
    left: 'center',
    itemWidth: 14,
    itemHeight: 10,
    textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
    itemGap: 18,
    data: [
      { name: '类别A', icon: 'roundRect' },
      { name: '类别B', icon: 'roundRect' },
      { name: '类别C', icon: 'roundRect' },
      { name: '类别D', icon: 'roundRect' }
    ]
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 15000,
    splitNumber: 6,
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 10,
      formatter: function (val) {
        if (val === 0) return '0'
        return (val / 1000) + 'k'
      }
    },
    splitLine: {
      lineStyle: { color: 'rgba(255,255,255,0.06)', type: 'dashed' }
    }
  },
  yAxis: {
    type: 'category',
    data: ['数据', '数据', '数据', '数据', '数据', '数据', '数据'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 11,
      fontWeight: 'bold',
      padding: [0, 8, 0, 0]
    },
    splitLine: { show: false }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(10,30,60,0.9)',
    borderColor: 'rgba(45,212,191,0.3)',
    textStyle: { color: '#fff', fontSize: 12 },
    formatter: function (params) {
      let html = '<b>' + params[0].axisValue + '</b><br/>'
      params.forEach(function (p) {
        html += p.marker + ' ' + p.seriesName + ': ' + p.value + '<br/>'
      })
      return html
    }
  },
  series: [
    {
      name: '类别A',
      type: 'bar',
      barWidth: 16,
      barGap: '30%',
      stack: 'total',
      animationDelay: function (idx) { return idx * 80 },
      itemStyle: {
        borderRadius: [0, 0, 0, 0],
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#14b8a6' },
            { offset: 1, color: '#2dd4bf' }
          ]
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#2dd4bf',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: function (params) {
          if (params.value > 0) return params.value
          return ''
        }
      },
      data: [3200, 2800, 3500, 2200, 4100, 3000, 2600]
    },
    {
      name: '类别B',
      type: 'bar',
      barWidth: 16,
      stack: 'total',
      animationDelay: function (idx) { return idx * 80 + 120 },
      itemStyle: {
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2,
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#0ea5e9' },
            { offset: 1, color: '#38bdf8' }
          ]
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#38bdf8',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: function (params) {
          if (params.value > 0) return params.value
          return ''
        }
      },
      data: [2400, 3100, 2800, 3500, 2600, 2900, 3200]
    },
    {
      name: '类别C',
      type: 'bar',
      barWidth: 16,
      stack: 'total',
      animationDelay: function (idx) { return idx * 80 + 240 },
      itemStyle: {
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2,
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#6366f1' },
            { offset: 1, color: '#818cf8' }
          ]
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#818cf8',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: function (params) {
          if (params.value > 0) return params.value
          return ''
        }
      },
      data: [1800, 1500, 2200, 1600, 1900, 2100, 1700]
    },
    {
      name: '类别D',
      type: 'bar',
      barWidth: 16,
      stack: 'total',
      animationDelay: function (idx) { return idx * 80 + 360 },
      itemStyle: {
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#a78bfa' }
          ]
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#a78bfa',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: function (params) {
          if (params.value > 0) return params.value
          return ''
        }
      },
      data: [1200, 900, 1500, 1100, 1300, 1000, 1400]
    }
  ]
}

const SCREEN_SCATTER_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2000,
  animationEasing: 'cubicOut',
  grid: {
    left: '8%',
    right: '6%',
    top: '15%',
    bottom: '22%',
    containLabel: true
  },
  legend: {
    bottom: '3%',
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
    itemGap: 24
  },
  xAxis: {
    type: 'category',
    data: ['W1', 'W5', 'W9', 'W13', 'W17', 'W21', 'W25', 'W29', 'W33', 'W37', 'W41', 'W45', 'W49'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.55)',
      fontSize: 10,
      interval: 0
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    min: 10,
    max: 100,
    splitNumber: 9,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 10
    },
    splitLine: {
      lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dotted' }
    }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10,30,60,0.9)',
    borderColor: 'rgba(79,195,247,0.3)',
    textStyle: { color: '#fff', fontSize: 12 },
    formatter: function (params) {
      return '<b>' + params.seriesName + '</b><br/>' +
        params.name + ': ' + params.value
    }
  },
  series: [
    {
      name: 'Product 1',
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: { color: '#ab47bc' },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(171,71,188,0.6)',
          borderColor: '#fff',
          borderWidth: 1.5
        }
      },
      data: [45, 62, 38, 75, 50, 82, 55, 68, 42, 90, 60, 48, 72]
    },
    {
      name: 'Product 2',
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: { color: '#26c6da' },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(38,198,218,0.6)',
          borderColor: '#fff',
          borderWidth: 1.5
        }
      },
      data: [30, 55, 70, 42, 65, 35, 78, 52, 88, 40, 73, 58, 45]
    },
    {
      name: 'Product 3',
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: { color: '#80deea' },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(128,222,234,0.6)',
          borderColor: '#fff',
          borderWidth: 1.5
        }
      },
      data: [68, 28, 52, 85, 38, 72, 45, 60, 25, 78, 50, 82, 35]
    }
  ]
}

// ============================================================
//  学校大屏 - 能力评价分布 (Bar)
// ============================================================
const SCHOOL_BAR_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 1600,
  animationEasing: 'cubicOut',
  grid: {
    left: '12%',
    right: '6%',
    top: '14%',
    bottom: '14%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['优秀', '良好', '中等', '及格', '待提高'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 11,
      fontWeight: 'bold'
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    show: false,
    max: 120
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(10,30,60,0.9)',
    borderColor: 'rgba(56,142,255,0.3)',
    textStyle: { color: '#fff', fontSize: 12 }
  },
  series: [{
    type: 'bar',
    barWidth: '40%',
    animationDelay: function (idx) { return idx * 120 },
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#4fc3f7' },
          { offset: 1, color: '#0288d1' }
        ]
      }
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(79,195,247,0.5)'
      }
    },
    label: {
      show: true,
      position: 'top',
      color: '#4fc3f7',
      fontSize: 12,
      fontWeight: 'bold',
      formatter: '{c}人'
    },
    data: [
      { value: 85, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#66bb6a' }, { offset: 1, color: '#2e7d32' }] } } },
      { value: 68, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#4fc3f7' }, { offset: 1, color: '#0288d1' }] } } },
      { value: 52, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ffb74d' }, { offset: 1, color: '#f57c00' }] } } },
      { value: 38, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ff8a65' }, { offset: 1, color: '#d84315' }] } } },
      { value: 22, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ef5350' }, { offset: 1, color: '#b71c1c' }] } } }
    ]
  }]
}

// ============================================================
//  学校大屏 - 综合学习力雷达图
// ============================================================
const SCHOOL_RADAR_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2000,
  animationEasing: 'cubicOut',
  radar: {
    center: ['50%', '52%'],
    radius: '60%',
    startAngle: 90,
    splitNumber: 5,
    shape: 'polygon',
    axisLine: { lineStyle: { color: 'rgba(79,195,247,0.2)' } },
    splitLine: { lineStyle: { color: 'rgba(79,195,247,0.15)' } },
    splitArea: {
      areaStyle: {
        color: ['rgba(79,195,247,0.05)', 'rgba(79,195,247,0.02)']
      }
    },
    indicator: [
      { name: '思维力\n158 ↑15', max: 200 },
      { name: '注意力\n128 ↑38', max: 200 },
      { name: '自控力\n59', max: 200 },
      { name: '记忆力\n64', max: 200 },
      { name: '反应力\n154 ↑33', max: 200 }
    ],
    axisName: {
      color: '#fff',
      fontSize: 11,
      fontWeight: 'bold',
      padding: [0, 0]
    }
  },
  tooltip: { show: false },
  series: [{
    type: 'radar',
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(79,195,247,0.45)' },
          { offset: 1, color: 'rgba(79,195,247,0.08)' }
        ]
      }
    },
    lineStyle: { color: '#4fc3f7', width: 2 },
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: { color: '#4fc3f7' },
    data: [
      {
        value: [158, 128, 59, 64, 154],
        name: '综合学习力'
      }
    ]
  }]
}

// ============================================================
//  学校大屏 - 注意力等级人数分布 (Pie)
// ============================================================
const SCHOOL_PIE_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 1400,
  animationEasing: 'cubicOut',
  color: ['#4fc3f7', '#66bb6a', '#ffb74d', '#ef5350', '#ab47bc'],
  legend: {
    orient: 'vertical',
    right: '8%',
    top: 'center',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 14,
    textStyle: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 12
    },
    formatter: function (name) {
      const valueMap = { 'S级': 11, 'A级': 12, 'B级': 35, 'C级': 32, 'D级': 10 }
      return name + '  ' + (valueMap[name] || '') + '人'
    }
  },
  series: [{
    type: 'pie',
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) { return idx * 150 },
    radius: ['35%', '60%'],
    center: ['35%', '50%'],
    roseType: true,
    itemStyle: {
      borderRadius: 4,
      borderColor: 'rgba(10,24,54,0.8)',
      borderWidth: 2
    },
    label: {
      show: true,
      position: 'inside',
      color: '#fff',
      fontSize: 13,
      fontWeight: 'bold',
      formatter: function (params) {
        if (params.percent > 10) return params.name + '\n' + params.percent.toFixed(0) + '%'
        return ''
      }
    },
    labelLine: { show: false },
    emphasis: {
      scale: true,
      scaleSize: 8,
      itemStyle: {
        shadowBlur: 12,
        shadowColor: 'rgba(0,0,0,0.35)'
      }
    },
    data: [
      { value: 11, name: 'S级' },
      { value: 12, name: 'A级' },
      { value: 35, name: 'B级' },
      { value: 32, name: 'C级' },
      { value: 10, name: 'D级' }
    ]
  }]
}

// ============================================================
//  学校大屏 - 注意力指数数据度量 (Line)
// ============================================================
const SCHOOL_LINE_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 2200,
  animationEasing: 'cubicInOut',
  grid: {
    left: '6%',
    right: '6%',
    top: '16%',
    bottom: '16%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    min: 80,
    max: 160,
    splitNumber: 4,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(10,30,60,0.9)',
    borderColor: 'rgba(79,195,247,0.3)',
    textStyle: { color: '#fff', fontSize: 12 }
  },
  series: [{
    name: '注意力指数',
    type: 'line',
    smooth: true,
    animationDelay: 0,
    symbol: 'circle',
    symbolSize: 6,
    showSymbol: true,
    lineStyle: { color: '#4fc3f7', width: 2.5 },
    itemStyle: { color: '#4fc3f7' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(79,195,247,0.35)' },
          { offset: 1, color: 'rgba(79,195,247,0.02)' }
        ]
      }
    },
    emphasis: {
      focus: 'series',
      lineStyle: { width: 3.5 }
    },
    markLine: {
      silent: true,
      symbol: ['none', 'none'],
      lineStyle: {
        type: 'dashed',
        color: '#ffb74d',
        width: 1.5
      },
      label: {
        color: '#ffb74d',
        fontSize: 11,
        fontWeight: 'bold',
        formatter: '平均分: {c}',
        position: 'insideEndTop'
      },
      data: [{ yAxis: 125 }]
    },
    data: [118, 122, 115, 130, 128, 135, 132, 140, 125, 138, 142, 136]
  }]
}

// ============================================================
//  双层环形图 (Double Ring Donut)
// ============================================================
const SCREEN_DOUBLE_RING_OPTION = {
  ...SCREEN_ANIMATION,
  animationDuration: 1600,
  animationEasing: 'cubicOut',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
    backgroundColor: 'rgba(0,0,0,0.75)',
    textStyle: { color: '#fff', fontSize: 12 }
  },
  legend: {
    show: false
  },
  graphic: [
    {
      type: 'text',
      left: 'center',
      top: '48%',
      style: {
        text: '总计',
        fill: 'rgba(255,255,255,0.45)',
        fontSize: 12,
        fontWeight: 'normal',
        textAlign: 'center',
        textVerticalAlign: 'middle'
      },
      z: 100
    },
    {
      type: 'text',
      left: 'center',
      top: '54%',
      style: {
        text: '128',
        fill: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        textVerticalAlign: 'middle'
      },
      z: 100
    }
  ],
  series: [
    // ===== 外圈环形 =====
    {
      name: '外圈',
      type: 'pie',
      z: 2,
      radius: ['60%', '82%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      padAngle: 2,
      itemStyle: {
        borderRadius: 6,
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2
      },
      label: {
        show: false
      },
      labelLine: { show: false },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: {
          shadowBlur: 14,
          shadowColor: 'rgba(255,255,255,0.3)'
        }
      },
      data: [
        {
          value: 35,
          name: '类别A',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#a78bfa' },
                { offset: 1, color: '#7c3aed' }
              ]
            }
          }
        },
        {
          value: 28,
          name: '类别B',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#60a5fa' },
                { offset: 1, color: '#2563eb' }
              ]
            }
          }
        },
        {
          value: 22,
          name: '类别C',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#f472b6' },
                { offset: 1, color: '#ec4899' }
              ]
            }
          }
        },
        {
          value: 18,
          name: '类别D',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#fb923c' },
                { offset: 1, color: '#f97316' }
              ]
            }
          }
        }
      ]
    },
    // ===== 内圈环形 =====
    {
      name: '内圈',
      type: 'pie',
      z: 3,
      radius: ['22%', '46%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      padAngle: 2,
      itemStyle: {
        borderRadius: 6,
        borderColor: 'rgba(10, 24, 54, 0.85)',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        formatter: '{d}%'
      },
      labelLine: { show: false },
      emphasis: {
        scale: true,
        scaleSize: 8,
        itemStyle: {
          shadowBlur: 14,
          shadowColor: 'rgba(255,255,255,0.3)'
        }
      },
      data: [
        {
          value: 40,
          name: '组X',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#67e8f9' },
                { offset: 1, color: '#22d3ee' }
              ]
            }
          }
        },
        {
          value: 35,
          name: '组Y',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#c084fc' },
                { offset: 1, color: '#a855f7' }
              ]
            }
          }
        },
        {
          value: 25,
          name: '组Z',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#f9a8d4' },
                { offset: 1, color: '#f472b6' }
              ]
            }
          }
        }
      ]
    }
  ]
}

export {
  BAROPTION,
  MAPOPTION,
  RADAROPTION,
  GAUGEOPTIO,
  SEMI_GAUGE_OPTION,
  SAFETY_RING_OPTION,
  SCREEN_BAR_OPTION,
  SCREEN_PIE_OPTION,
  SCREEN_PIE_OPTION_2,
  SCREEN_LINE_OPTION,
  SCREEN_RADAR_OPTION,
  SCREEN_AREA_STACK_OPTION,
  SCREEN_MIX_BAR_LINE,
  SCREEN_HORIZ_STACK_BAR,
  SCREEN_SCATTER_OPTION,
  SCREEN_DOUBLE_RING_OPTION,
  SCHOOL_BAR_OPTION,
  SCHOOL_RADAR_OPTION,
  SCHOOL_PIE_OPTION,
  SCHOOL_LINE_OPTION
}
