<template>
  <el-card :body-style="{ padding: '0px' }" class="card">
    <img src="../../assets/images/ppt/ppt1.png">
    <div style="padding: 14px;">
      <span>PPT模板</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button">操作按钮</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PptCard"
}
</script>

<style scoped>
.card img{
  /*height: 100px;*/
  background-color: #2E8B57;
  /*padding: 10px;*/
  width: 300px;
}


.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
</style>
