<!--主页左边的文字列表-->
<template>
  <div>
    <h2>公告</h2>
    <div style="vertical-align: middle;margin-bottom: 40px;" v-for="c in announcementList" :key="c.id">
      <el-row class="clearMarginBottom">
        <el-col :span="24">
          <div class="verticalCenter">
            <el-avatar size="large"
                       :src="c.userPicture"></el-avatar>
            <span>{{ c.userName }}：</span>
            <h3 style="margin: 0px 2px">&nbsp;{{ c.title }}</h3>
            <span class="time-style">{{ c.create_time | timer }}</span>
          </div>
        </el-col>
      </el-row>
      <div class="clearMarginBottom">
        <div style="margin-left: 40px;">
          <div class="grid-content ">{{ c.preview }}
            <el-link @click="toAnnouncementDetail(c.id)"
                style="color: #3a8ee6;font-size: 15px;margin-bottom: 3px;">...查看全文</el-link>
          </div>
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
  name: "HomeList",
  data() {
    return {
      announcementList: [],
    };
  },
  methods: {
    //查询点赞最多9条的评论
    searchAnnouncement() {
      axios({
        url: "/rank/searchAnnouncement",
        method: "post",
      }).then(response => {
            if (response.data) {
              this.announcementList = response.data;
            } else
              messageTips(this, '啊哦，请求公告失败!', "warning");
          },
          error => {
            console.log("searchAnnouncement 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //转去公告详情界面
    toAnnouncementDetail(id){
      this.$router.push({
        name: 'announcementDetail',
        params: {
          id: id,
        },
      })
    },
  },
  created() {
    this.searchAnnouncement();
  }
}
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.time-style{
  margin: 5px 0 0 20px;
  color: #8e9aaf;
  font-size: small;
}

.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}

.clearMarginBottom {
  margin: 0px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.verticalCenter {
  display: flex;
  align-items: center;
}
</style>