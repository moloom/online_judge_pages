<!--展示题目集界面-->

<template>
  <div>
    <!--    等下这里加一个v-show -->
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
            <el-dropdown-item :command="[t.id,t.name]" style="float: left;" v-for="t in tagList" :key="t.id">
              {{ t.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>&nbsp;&nbsp;&nbsp;

        <el-input style="width: 27%;"
                  placeholder="搜索题目或编号"
                  v-model="keywords"
                  prefix-icon="el-icon-search"
                  clearable>
        </el-input>
        <el-tooltip class="item" effect="dark" content="清空搜索条件" placement="top-end">
          <el-button class="clearButtonStyle" icon="el-icon-delete" @click="handleClose(-1,-1)"></el-button>
        </el-tooltip>&nbsp;&nbsp;
        <el-button type="success" size="small ">随机一题</el-button>

        <!--  显示查询的条件 -->
        <div style="width: 80%;height: 45px;border: white solid 1px;padding-top: 10px;" v-show="tags.length">
          <el-tag :disable-transitions="true"
                  v-for="(tag,index) in tags" style="margin: 0px 5px 0px 5px;"
                  :key="tag.name"
                  closable @close="handleClose(index,tag.id)"
                  :type="tag.type">
            {{ tag.name }}
          </el-tag>
        </div>
        <el-table v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(233, 233, 233, 0.8)"
                  :data="problemList" v-on:row-click="toSolveProblem"
                  stripe empty-text="暂无数据"
                  style="width: 100%">
          <el-table-column
              prop="id" column-key="id"
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
              width="80px">
          </el-table-column>
        </el-table>
        <!--  分页  -->
        <div class="pagination">
          <el-pagination @current-change="changePage"
                         layout="prev, pager, next"
                         :current-page="currentPage"
                         :total="totalCount">
          </el-pagination>
        </div>
      </div>

      <div class="sidebar">
        <div>
          <!--  引入标签云    -->
          <TagCloud></TagCloud>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";
import TagCloud from "@/components/TagCloud";


export default {
  name: "ProblemSet",
  components: {
    TagCloud,
  },
  data() {
    return {
      totalCount: 0,//分页用，总记录条数
      currentPage: 1,//分页用，当前页数
      tags: [{}],//清除条件用
      keywords: "",//搜索条件
      visible: false,
      loading: false,//加载条件
      //搜索条件
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
    toSolveProblem(row) {
      this.$store.state.sLogin.isAtLogin = true;//告诉别的组件，用户要去solution界面啦，不该出来的就不要出来啦
      this.$router.push({
        name: 'solution',
        params: {
          id: row.id,
        },
      })
    },
    //清空搜索条件
    handleClose(index, id) {
      this.loading = true;
      //删除单个条件
      if (id == 1)
        this.condition.difficulty = 0;
      if (id == 2)
        this.condition.state = 0;
      if (id == 3)
        this.condition.tag = 0;
      if (index != -1)
        this.tags.splice(index, 1);
      else {//清空所有条件
        this.condition.difficulty = 0;
        this.condition.status = 0;
        this.condition.tag = 0;
        this.condition.start = 0;
        this.condition.keyword = "";
        this.keywords = "";
      }
      this.searchProblemListByConditions();
    },
    //切换难度触发
    difficultyCommand(command) {
      //command属性类似id，下拉框的中的选项的唯一标识。方法在点击下拉框下的选项触发
      this.loading = true;
      this.condition.difficulty = command;
      for (let i = 0; i < this.tags.length; i++) {
        //删除当前已有的同类条件
        if (this.tags[i] != null && this.tags[i].id == 1) {
          this.tags.splice(i, 1);
        }
      }
      if (command == 1)
        this.tags.push({id: 1, name: "简单", type: "success"});
      else if (command == 2)
        this.tags.push({id: 1, name: "中等", type: "success"});
      else if (command == 3)
        this.tags.push({id: 1, name: "困难", type: "success"});
      this.searchProblemListByConditions();
    },
    stateCommand(command) {
      this.loading = true;
      this.condition.state = command;
      for (let i = 0; i < this.tags.length; i++) {
        //删除当前已有的同类条件
        if (this.tags[i].id == 2) {
          this.tags.splice(i, 1);
        }
      }
      if (command == 1)
        this.tags.push({id: 2, name: "未开始", type: ""})
      else if (command == 2)
        this.tags.push({id: 2, name: "已解答", type: ""})
      else if (command == 3)
        this.tags.push({id: 2, name: "尝试过", type: ""})
      this.searchProblemListByConditions();
    },
    tagCommand(command) {
      this.loading = true;
      this.condition.tag = command[0];
      for (let i = 0; i < this.tags.length; i++) {
        //删除当前已有的同类条件
        if (this.tags[i].id == 3) {
          this.tags.splice(i, 1);
        }
      }
      this.tags.push({id: 3, name: command[1], type: "success"})
      this.searchProblemListByConditions();
    },
    //查询题目list，条件：难度、状态、标签、题目或编号
    searchProblemListByConditions() {
      axios({
        url: "/problems/searchProblemListByConditions",
        method: "post",
        data: qs.stringify({
          difficulty: this.condition.difficulty,
          status: this.condition.state,
          tag: this.condition.tag,
          keyword: this.condition.keyword,
          user_id: localStorage.getItem("id"),
          start: this.condition.start,
        })
      }).then(response => {
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
      //查询完后，重置搜索信息
      if (this.$store.state != null)
        this.$store.state.searchText = null;
    },
    //查询题目数量
    searchProblemCountByConditions() {
      this.loading = true;
      axios({
        url: "/problems/searchProblemCountByConditions",
        method: "post",
        data: qs.stringify({
          difficulty: this.condition.difficulty,
          status: this.condition.state,
          tag: this.condition.tag,
          keyword: this.condition.keyword,
          user_id: localStorage.getItem("id"),
        })
      }).then(response => {
            if (response.data) {
              this.totalCount = response.data;
            } else {
              messageTips(this, '啊哦，请求题目数量失败', "error");
            }
          },
          error => {
            console.log("searchProblemCountByConditions 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //查看所有的标签
    searchTagList() {
      this.tags.shift();//删除数组中默认值
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
    },
    //翻页
    changePage(pageNumber) {
      this.loading = true;
      this.condition.start = (pageNumber - 1) * 10;
      this.searchProblemListByConditions();
    },
    //处理从导航栏搜索跳转到当前界面的事件
    handleSearch() {
      console.log("3232");
      if (localStorage.getItem("searchText") != null) {
        //清空所有条件
        this.handleClose();
        this.keywords = localStorage.getItem("searchText");
      }
    },
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.loading = true;
        this.condition.keyword = this.keywords;
        this.searchProblemListByConditions();
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      },
    }
  },
  created() {
    this.loading = true;
    this.$store.state.fullscreenLoading = true;
    this.handleSearch();
    this.searchTagList();
    this.searchProblemCountByConditions();
    if (localStorage.getItem("id")==null)
      this.$router.push({
        path:"/login"
      })
  },
  mounted() {
    //删除掉导航栏传过来的条件
    if (localStorage.getItem("searchText") != null)
      localStorage.removeItem("searchText");
    setTimeout(() => {
      this.loading = false;
      this.$store.state.fullscreenLoading = false;
    }, 700);
  },
  updated() {
    setTimeout(() => {
      this.loading = false;
      this.$store.state.fullscreenLoading = false;
    }, 700);
  }

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