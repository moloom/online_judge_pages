<template>
  <div class="">
    <div class="pd2">
      <div class="pd3">
        <el-dropdown size="medium" split-button type="primary" trigger="click" @command="difficultyCommand">
          难度
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">简单</el-dropdown-item>
            <el-dropdown-item command="2">中等</el-dropdown-item>
            <el-dropdown-item command="3">困难</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;
        <el-dropdown size="medium" split-button type="primary" trigger="click" @command="stateCommand">
          状态
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">未开始</el-dropdown-item>
            <el-dropdown-item command="2">已解答</el-dropdown-item>
            <el-dropdown-item command="3">尝试过</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;
        <el-dropdown size="medium" split-button type="primary" trigger="click" @command="tagCommand"
                     placement="bottom-start">
          标签
          <el-dropdown-menu slot="dropdown" style="width: 200px;">
            <el-dropdown-item :command="t.id" style="float: left;" v-for="t in tagList" :key="t.id">{{ t.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;

        <el-input style="width: 27%;"
                  placeholder="搜索题目或编号"
                  v-model="keyword"
                  prefix-icon="el-icon-search"
                  clearable>
        </el-input>
        <el-tooltip class="item" effect="dark" content="清空搜索条件" placement="top-end">
          <el-button class="clearButtonStyle" icon="el-icon-delete"></el-button>
        </el-tooltip>&nbsp;&nbsp;
        <el-button type="success" size="small ">随机一题</el-button>
        <el-table
            :data="problemList"
            stripe
            style="width: 100%">
          <el-table-column
              prop="id"
              label="编号"
              width="70px">
          </el-table-column>
          <el-table-column
              prop="title"
              label="题目"
              width="357">
          </el-table-column>
          <el-table-column
              prop="point"
              label="奖励"
              width="70">
          </el-table-column>
          <el-table-column
              prop="difficultyName"
              label="难度"
              width="80">
          </el-table-column>
          <el-table-column
              prop="passRate"
              label="通过率"
              width="100">
          </el-table-column>
          <el-table-column
              prop="submit_pass_number"
              label="通过人数"
              width="70px">
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
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "ProblemSet",
  data() {
    return {
      keyword: "",
      visible: false,
      condition: {
        difficulty: 0,
        state: 0,
        tag: 0,
        keyword: "",
        start: 0,
      },
      problemList: [{
        id: '',
        title: '',
        point: '',
        difficulty: '',
        difficultyName: "",
        passRate: "",
        submit_times: "",
        submit_pass_times: "",
        submit_pass_number: "",
      }],
      tagList: [{
        id: "",
        name: '',
        create_time: '',
      }],
    }
  },
  methods: {
    difficultyCommand(command) { //command属性类似id，下拉框的中的选项的唯一标识。方法在点击下拉框下的选项触发
      this.$message('难度： ' + command);
      this.condition.difficulty = command;
      this.searchProblemListByConditions();
    },
    stateCommand(command) {
      this.$message('状态： ' + command);
      this.condition.state = command;
      this.searchProblemListByConditions();
    },
    tagCommand(command) {
      this.$message('标签： ' + command);
      this.condition.tag = command;
      this.searchProblemListByConditions();
    },
    searchProblemListByConditions() {
      //查询题目list，条件：难度、状态、标签、题目或编号
      axios({
        url: "/problems/searchProblemListByConditions",
        method: "post",
        data: qs.stringify({
          difficulty: this.condition.difficulty,
          status: this.condition.state,
          tag: this.condition.tag,
          keyword: this.condition.keyword,
          user_id: this.$store.state.sLogin.users.id,
          start: this.start,
        })
      }).then(response => {
            console.log("searchProblemListByConditions:", response.data);
            if (response.data) {
              this.problemList = response.data;
            } else {
              messageTips(this, '啊哦，请求题目List失败', "error");
            }
          },
          error => {
            console.log("searchProblemListByConditions请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })

    },
  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.condition.keyword = this.keyword;
          this.searchProblemListByConditions();
        }, 1000)
      },
    }
  },
  mounted() {
    //获取标签list
    axios({
      url: "/problems/searchTagAll",
      method: "post",
    }).then(response => {
          if (response.data) {
            this.tagList = response.data;
          } else {
            messageTips(this, '啊哦，请求标签List失败', "error");
          }
        },
        error => {
          console.log("searchTagAll请求失败", error);
          messageTips(this, '啊哦，网络打了个盹', "error");
        });
    // this.searchProblemListByConditions();
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