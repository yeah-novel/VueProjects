<template>

  <div class="data-container">
    <!-- 数据面板 -->
    <div class="left">
      <div class="card">
        <div class="title">
          Focus on the right stuff
        </div>
        <div class="subtitle">
          Explore only what you need and don’t
waste time on the unneccesary stuff.
        </div>
        <map-echart echarts-type="bar" height="250px" />
      </div>
      <!--  -->
      <div class="card ">
        <div class="title">
          See whose doing what
        </div>
        <div class="subtitle">
          Get everyone on the same page all of the time
        </div>
        <map-echart echarts-type="radar" height="250px" />
      </div>
    </div>
    <div class="middle">
      <!-- 地图 -->
      <div class="map-chart">
        <map-echart region="china" class="map-box"/>
      </div>
      <!--  -->
      <div class="grid" >
        <div class="grid-content grid-con-1 card">
          <img class="grid-con-icon" src="@/assets/icon/icon_usernum.svg" alt="">
          <div class="grid-cont-right">
            <div class="grid-num">1234</div>
            <div>用户访问量</div>
          </div>
        </div>
        <div class="grid-content grid-con-2 card">
          <img class="grid-con-icon" src="@/assets/icon/icon_rank.svg" alt="">
          <div class="grid-cont-right">
            <div class="grid-num">NO.02</div>
            <div>排名</div>
          </div>
        </div>
        <div class="grid-content grid-con-3 card">
          <img class="grid-con-icon" src="@/assets/icon/icon_data.svg" alt="">
          <div class="grid-cont-right">
            <div class="grid-num">1234</div>
            <div>系统消息</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="card right-top">
        <div class="user-info">
          <img src="@/assets/icon/icon_avatar.png" class="user-avator" alt />
          <div class="user-info-cont">
            <div class="user-info-name">用户名</div>
          </div>
        </div>
        <div class="user-info-list">
          上次登录时间：
          <span>2025-11-01</span>
        </div>
        <div class="user-info-list">
          上次登录地点：
          <span>浙江</span>
        </div>
      </div>
      <rank-card :table-list="tableList"
        :item-height="40"
        :interval="1500"
        :visible-num="5"
        class="card"/>
      <div class="card right-bottom">
        <div class="title">
          城市气温
        </div>
        <map-echart echarts-type="gauge" height="160px" />
      </div>
    </div>

  </div>
</template>

<style>
.title {
  color:  rgba(240, 240, 240, 1);
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0%;
  text-align: left;
  /* padding: 10px 0px 0px 10px; */
}

.subtitle {
  color:  rgb(219, 213, 213);
  font-family: IBM Plex Sans;
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 1%;
  text-align: left;
  /* padding: 10px 0px 0px 10px; */
}

.data-container {
  background: linear-gradient(#0056b1, #248fd8);
  position: flex;
  display: flex;
  /* padding: 0px 10px 10px 10px; */
  height: 100%;
  width: 100%;
}

.left {
  width: 280px;
  /* background:rgb(147, 144, 238); */
  padding: 20px 10px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right{
  width:250px;
  padding: 20px 20px 20px 10px;
  /* background:lightgreen; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.middle {
  flex: 1;
  /* background:rgb(238, 219, 144); */
  padding: 20px 10px 20px 10px;
  display: flex;
  flex-direction: column;
}

.map-box {
  height: 100%;
  flex: 1;
  /* background: rgb(238, 196, 144); */
}

.map-chart{
  height: 100%;
}

.card {
  border-width: 1px;
  border-color:  rgba(25,25,112,0.4);
  background-color: rgba(25,25,112,0.2);
  box-shadow: 0 2px 12px 0 rgba(18, 45, 136, 0.7);
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  /* margin-top: 10px; */
}

.grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 150px;
  /* background: rgb(238, 144, 156); */
  /* justify-content: center; */
}

.grid-content {
  display: flex;
  align-items: center;
  height: 80px;
  background: rgba(7, 43, 119, 0.2);
  width: 28%;
  border-radius: 5px;
  overflow: hidden;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #fff;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}

.grid-num {
  color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #ffffff;
  margin-bottom: 20px;
}
.user-avator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 20px;
  flex: 1;
  font-size: 28px;
  color: #ffffff;
}

.user-info-list {
  font-size: 14px;
  color: #f4e6e6;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 20px;
}

</style>

<script>
import rankCard from '../components/RankCardWithScroll.vue'
import mapEchart from '../components/Echart/MapEchart.vue'

export default {
  name: 'Screen1',
  data () {
    return {
      tableList: [ ]
    }
  },
  components: {rankCard, mapEchart},
  watch: {

  },
  methods: {
    fetchData () {
      const data = require('../mapJson/tableData.json')
      console.log(data)
      return data
    }
  },
  mounted () {
    this.tableList = this.fetchData()['rankData']
  }
}
</script>
