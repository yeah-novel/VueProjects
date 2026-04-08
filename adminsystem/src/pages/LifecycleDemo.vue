<template>
  <div>
    <h1>Vue 生命周期示例</h1>
    <p>当前计数: {{ count }}</p>
    <button @click="count++">增加计数</button>
    <button @click="destroyComponent">销毁组件</button>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'LifecycleDemo',
  data() {
    return {
      count: 0,
      timer: null
    }
  },
  // 1. 创建阶段
  beforeCreate() {
    console.log('1. beforeCreate - 实例刚创建，data和methods还未初始化')
    console.log('data:', this.$data) // undefined
    console.log('count:', this.count) // undefined
  },
  created() {
    console.log('2. created - 实例创建完成，可以访问data和methods')
    console.log('count:', this.count) // 0
    console.log('$el:', this.$el) // undefined，DOM还未生成

    // 常用场景：发起异步请求
    this.timer = setInterval(() => {
      console.log('定时器运行中...')
    }, 1000)
  },
  // 2. 挂载阶段
  beforeMount() {
    console.log('3. beforeMount - 模板编译完成，但还未挂载到DOM')
    console.log('$el:', this.$el) // 存在但内容未渲染
  },
  mounted() {
    console.log('4. mounted - 实例已挂载到DOM')
    console.log('$el:', this.$el) // 已渲染的DOM

    // 常用场景：DOM操作或集成第三方库
    const el = this.$el.querySelector('h1')
    console.log('h1内容:', el.textContent)
  },
  // 3. 更新阶段
  beforeUpdate() {
    console.log('5. beforeUpdate - 数据更新前，DOM还未重新渲染')
    console.log('count将变为:', this.count)
    const p = this.$el.querySelector('p')
    console.log('DOM中的计数:', p.textContent) // 旧值
  },
  updated() {
    console.log('6. updated - 数据更新后，DOM已重新渲染')
    const p = this.$el.querySelector('p')
    console.log('DOM中的计数:', p.textContent) // 新值
  },
  // 4. 销毁阶段
  beforeDestroy() {
    console.log('7. beforeDestroy - 实例销毁前')
    console.log('count:', this.count) // 仍然可以访问

    // 重要：清除定时器、事件监听等
    clearInterval(this.timer)
    console.log('已清除定时器')
  },
  destroyed() {
    console.log('8. destroyed - 实例销毁后')
    // 所有指令解绑，事件监听器移除，子实例也被销毁
  },
  methods: {
    destroyComponent() {
      this.$destroy()
      console.log('组件已手动销毁')
    }
  }
}
</script>
