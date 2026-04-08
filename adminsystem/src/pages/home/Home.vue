<template>
  <div class="container" >
    <div class="header">
      <div>
        <v-search-box  style="width: 700px; height: 60px" class="search-box"/>
      </div>
      <div>
        <v-color-bar style="width: 700px" />
      </div>
    </div>
    <div class="middle">
      <div class="">
        <el-row :gutter="10" style="height: 200px">
         <el-col :span="12">
           <el-card class="menu">
            <v-category />
           </el-card>
         </el-col>
          <el-col :span="6" class="img-card">
            <el-image
              :src="imgUrl1"
              fit="fill"></el-image>
          </el-col>
          <el-col :span="6" class="img-card">
            <el-image
              :src="imgUrl2"
              fit="fill"></el-image>
          </el-col>
        </el-row>
      </div>
      <div class="ppt-content">
        <div
          v-for="(ppt, index) in ppts"
          :key="index"
          class="grid-item"
        >
          <v-ppt-card />
        </div>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>

</template>

<style>
.container {
  background-color: #f0f0f0;
  height: 100%; /* 或固定高度 */
  overflow-y: auto; /* 垂直滚动 */
}

.header {
  display: flex;
  justify-content: center; /* 水平 */
  align-items: center;     /* 垂直 */
  padding: 50px;
  flex-direction: column;

}

.header v-color-bar {
  margin-top: 20px;
}


.menu {
  background-color: #2E8B57;
}

.el-col {
  height: 200px;
}

.img-card img{
  height: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.middle {
  display: flex;
  justify-content: center; /* 水平 */
  align-items: center;     /* 垂直 */
  flex-direction: column;
  /*overflow-y: scroll;*/
  /*height: 100%;*/
}

.ppt-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 一行 4 列 */
  gap: 20px; /* 列间距 */
  padding: 20px;
}

.grid-item {
  background: #2E8B57;
  text-align: center;
  border-radius: 8px;
  padding: 0px;
}

</style>

<script>
import vCarousel from "../../components/Carousel.vue"
import vCategory from "./Category.vue"
import vSearchBox from "../../components/SearchBox.vue"
import vColorBar from './ColorBar.vue'
import vPptCard from './PptCard.vue'
import image1 from "../../assets/images/carousel-image1.jpeg"
import image2 from "../../assets/images/carousel-image2.jpeg"
import PptCard from "./PptCard.vue"
export default {
  name: "",
  components: {PptCard, vCarousel, vCategory, vSearchBox, vColorBar, vPptCard},
  data () {
    return {
      imgUrl1: image1,
      imgUrl2: image2,
      ppts: ["","","",""]
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleWindowScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll);
  },
  methods: {
    handleWindowScroll() {
      console.log("窗口滚动位置:", window.scrollY);
    }
  }
}
</script>

