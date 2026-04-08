<template>
  <div class="container">
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div >
          <div class="handle-box">
            <el-button
                type="primary"
                icon="el-icon-delete"
                class="handle-del mr10"
                @click="delAllSelection"
            >批量删除</el-button>
            <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
              <el-option v-for="(addItem,index) in addItems" :key=index :label="addItem" :value="addItem" ></el-option>
            </el-select>
            <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
            <el-date-picker v-model="query.dateValue" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-dropdown split-button type="primary" @command="handleCommand" class="download-btn">
              导出数据
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="csv">csv</el-dropdown-item>
                <el-dropdown-item command="xlsx">xlsx</el-dropdown-item>
                <el-dropdown-item command="json">json</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-table
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                :data="tableData"
            >
                <el-table-column type="selection" width="55" ></el-table-column>
                <el-table-column prop="ID" label="ID" width="55" ></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="money" label="账户余额"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='1'?'success':(scope.row.state==='0'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <!-- 删除提示框 -->
                        <el-popconfirm
                          title="确定删除该条数据吗？"
                          @confirm="handleDelete(scope.$index, scope.row)"
                        >
                          <el-button
                              type="text"
                              icon="el-icon-delete"
                              class="red"
                              slot="reference"
                          >删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
             <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="editData" label-width="70px">
            <el-form-item label="用户名">
                <el-input v-model="editData.name"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="editData.address"></el-input>
            </el-form-item>
            <el-form-item label="金额">
              <el-input v-model="editData.money"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="editData.state"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script >
import { exportTableData } from '../utils/exportUtils';
export default {
  data: () => ({
    // 筛选条件（地址、用户名、日期）
    query: {
      address: '',
      name: '',
      dateValue: ''
    },
    addItems: ['北京市', '广东省', '上海市', '浙江省'],
    multipleSelection: [],
    delList: [],
    // 页面相关设置（总记录数、当前页数、页面条数）
    pageTotal: 0,
    pageIndex: 1,
    pageSize: 5,
    // 编辑某条数据
    editVisible: false,
    editData: {
      ID: '',
      name: '',
      address: '',
      money: 0,
      date: ''
    },
    // 筛选后的数据集 、 table数据集、 总的数据集
    filterData: [],
    tableData: [],
    totalData: []
  }),
  methods: {
    delAllSelection () {
    },
    handleSelectionChange () {

    },
    filterArrayByConditions(array, conditions) {
      // 如果没有条件或所有条件值为空，返回原数组
      if (!conditions || Object.values(conditions).every(val => !val || val.trim() === '')) {
        return array
      }

      return array.filter(item => {
        return Object.entries(conditions).every(([key, value]) => {
          // 如果该条件值为空，则跳过这个条件的检查
          if (!value || value.trim() === '') return true
          // 否则检查是否匹配（不区分大小写）
          return String(item[key]).toLowerCase().includes(value.toLowerCase())
        })
      })
    },
    handleSearch () {
      console.log('handleSearch', this.query.address)
      const conditions = {
        address: this.query.address,      // 名字包含 'a'
        name: this.query.name // 部门包含 'it'
      };
      this.filterData = this.filterArrayByConditions(this.totalData, conditions)
      this.tableData = this.handlePageShow(this.filterData, 1, this.pageSize)
      console.log(conditions, this.filterData)
    },
    // 编辑数据
    handleEdit (index, row) {
      console.log(index, row)
      this.editVisible = true
      this.editData = row
    },
    //编辑数据
    saveEdit () {
      this.editVisible = false
      this.totalData.forEach(user => {
        if (user.ID === this.editData.ID) {
          user.name = this.editData.name
          user.address = this.editData.address
          user.money = this.editData.money
        }
      })
    },
    // 删除数据
    handleDelete (index, row) {
      console.log('handleDelete', index, row)
      this.tableData.splice(index, 1)
    },
    handlePageShow (dataList, pageIndex, pageSize) {
      console.log('handlePageShow', 'pageIndex' + pageIndex)
      let start = (pageIndex - 1) * pageSize
      let end = start + pageSize
      return dataList.slice(start, end)
    },
    handlePageChange (pageIndex) {
      this.tableData = this.handlePageShow(this.totalData, pageIndex, this.pageSize)
    },
    fetchData () {
      const data = require('../data/tableData.json')
      console.log(data)
      return data
    },
    handleCommand (command) {
      console.log("handleCommand:", command)
      exportTableData(this.tableData, '用户数据', command);
    }
  },
  mounted () {
    this.totalData = this.fetchData()['tableData']
    this.filterData = this.totalData
    this.handlePageChange(1)
    console.log('pageTotal:' + this.pageTotal)
  },
  // 监听数据变化
  watch: {
    filterData (newVal, oldVal) {
      this.pageTotal = newVal.length
    }
  }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 80px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.handle-del {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.download-btn {
  background-color: #67C23A;
  border-color: #67C23A;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
