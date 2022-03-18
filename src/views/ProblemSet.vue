<template>
  <div>
    <div>
      <el-dropdown size="medium" split-button type="primary" trigger="click">
        难度
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown size="medium" split-button type="primary" trigger="click">
        状态
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown size="medium" split-button type="primary" trigger="click">
        标签
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      &nbsp;
      <el-input
          placeholder="请输入内容"
          v-model="text"
          prefix-icon="el-icon-search"
          clearable>
      </el-input>
    </div>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ProblemSet",
  data() {
    return {
      text:"",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
}
</script>

<style scoped>

</style>