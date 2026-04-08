<template>
 <div class="container">
  <!-- 图片走马灯 -->
  <div class="carousel">
    <v-carousel :images="images"/>
  </div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
            <el-breadcrumb-item>图片上传</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div>
        <div class="content-title">支持拖拽</div>
        <el-upload
            class="upload-demo"
            drag
            action="http://jsonplaceholder.typicode.com/api/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div class="content-title">活动进度</div>
        <div class="plugins-tips">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
              :timestamp="activity.timestamp">
              {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import image1 from '../assets/images/carousel-image1.jpeg'
import image2 from '../assets/images/carousel-image2.jpeg'
import vCarousel from '../components/Carousel.vue'
export default {
  data () {
    return {
      reverse: true,
      images: [ image1, image2 ],
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15',
        color: '#0bbd87'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  methods: {
  },
  components: {
    vCarousel
  }
}
</script>

<style scoped>
.content-title{
      font-weight: 400;
      line-height: 50px;
      margin: 10px 0;
      font-size: 22px;
      color: #1f2f3d;
  }
.pre-img{
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo{
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn{
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>
