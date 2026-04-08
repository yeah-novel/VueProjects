<template>
  <div class="color-picker">
  <el-row >
    <el-col  v-for="(color, index) in colors" :style="{'background-color': color}">

    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'ColorBar',
  props: {
    colors: {
      type: Array,
      default: () => ['#FF0000', '#0000FF', '#00FF00', '#000000', '#FFFFFF']
    }
  },
  data() {
    return {
      markers: [...this.colors],
      selectedMarker: null,
      isDragging: false,
      hoverPosition: null
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.color-picker {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  height: 20px;
}

.color-picker .el-row {

}

.color-picker .el-col {
  height: 20px;
  width: 50px;
}

</style>
