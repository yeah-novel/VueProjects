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
    data: ['01','02','03','04','05','06','07','08','09','10','11','12'],
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

export {
  BAROPTION,
  MAPOPTION,
  RADAROPTION,
  GAUGEOPTIO,
  SEMI_GAUGE_OPTION,
  SAFETY_RING_OPTION,
  SCREEN_BAR_OPTION,
  SCREEN_PIE_OPTION,
  SCREEN_LINE_OPTION,
  SCREEN_RADAR_OPTION,
  SCREEN_AREA_STACK_OPTION
}
