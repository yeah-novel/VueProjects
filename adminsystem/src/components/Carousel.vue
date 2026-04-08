<template>
  <el-carousel :interval="3000" type="card" >
    <el-carousel-item v-for="(item, index) in images" :key="index">
      <img :src="item" class="carousel-image" alt="轮播图片">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
    }
  }
}
</script>

<style>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 自定义指示器样式 */
.el-carousel__indicator .el-carousel__button {
  background-color: rgba(255, 255, 255, 0.5);
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.el-carousel__indicator.is-active .el-carousel__button {
  background-color: #fff;
}
</style>
