<template>
  <div class="">
    <div class="pd2">
      <div class="pd3">
        <el-dropdown size="medium" split-button type="primary" trigger="click" @command="difficultyCommand">
          难度
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;
        <el-dropdown size="medium" split-button type="primary" trigger="click" @command="stateCommand">
          状态
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="2">黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;
        <el-dropdown size="medium" split-button type="primary" trigger="click" @command="tagCommand"
                     placement="bottom-start">
          标签
          <el-dropdown-menu slot="dropdown" style="width: 250px;">
            <el-dropdown-item command="3" style="float: left;" v-for="index in 12" :key="index">黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;

        <el-input style="width: 27%;"
                  placeholder="搜索题目或编号"
                  v-model="text"
                  prefix-icon="el-icon-search"
                  clearable>
        </el-input>
        <el-tooltip class="item" effect="dark" content="清空搜索条件" placement="top-end">
          <el-button class="clearButtonStyle" icon="el-icon-delete"></el-button>
        </el-tooltip>&nbsp;&nbsp;
        <el-button type="success" size="small ">随机一题</el-button>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="id"
              label="编号"
              width="70px">
          </el-table-column>
          <el-table-column
              prop="name"
              label="题目"
              width="357">
          </el-table-column>
          <el-table-column
              prop=""
              label="奖励"
              width="70">
          </el-table-column>
          <el-table-column
              prop=""
              label="难度"
              width="80">
          </el-table-column>
          <el-table-column
              prop=""
              label="通过率"
              width="100">
          </el-table-column>
          <el-table-column
              prop="id"
              label="状态"
              width="70px">--
          </el-table-column>
        </el-table>
      </div>

      <div class="sidebar">
        <div>
          日期打卡表，类似力扣题库右边的
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemSet",
  data() {
    return {
      text: "",
      visible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },]
    }
  },
  methods: {
    difficultyCommand(command) { //command属性类似id，下拉框的中的选项的唯一标识。方法在点击下拉框下的选项触发
      this.$message('click on item ' + command);
    },
    stateCommand(command) {
      this.$message('click on item ' + command);
    },
    tagCommand(command) {
      this.$message('click on item ' + command);
    },
  },

}
</script>

<style scoped>
.pd2 {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;

}

.pd3 {
  width: 65%;
  float: left;
}

.sidebar {
  width: 34%;
  float: left;
}

/*搜索框那部分样式*/
.bodyTop {
}

/*body中的题目列表样式*/
.bodyText {
}

.clearButtonStyle {
  color: #13ce66;
  border: solid 0px;
  font-size: 23px;
  padding: 7px 15px;
}

</style>