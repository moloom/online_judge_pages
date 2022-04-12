<template>
  <div>
    <div style="width: 1100px;margin: 40px auto 0px;">
      <h2>账号设置</h2>
      <div class="input-style">
        <div class="input-info-style">昵称：</div>
        <el-input v-model="user.name" :readonly="true">
          <el-button slot="append" @click="updateUserName">修改</el-button>
        </el-input>
      </div>
      <div class="input-style">
        <div class="input-info-style">邮箱：</div>
        <el-input v-model="user.email">
          <el-button slot="append" @click="updateUserName">{{ user.email_status == 0 ? "未激活" : "已激活" }}</el-button>
        </el-input>
      </div>
      <div>
        <div class="input-info-style">性别：</div>
        <el-select v-model="user.sex" placeholder="请选择" style="width: 100%;">
          <el-option
              v-for="g in gender"
              :key="g.value"
              :label="g.label"
              :value="g.value"></el-option>
        </el-select>
      </div>
      <div class="input-style">
        <div class="input-info-style">生日：</div>
        <el-date-picker style="width: 100%;"
                        v-model="user.birthday"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="input-style">
        <div class="input-info-style">偏好语言：</div>
        <el-select v-model="user.prefer_language" placeholder="请选择" style="width: 100%;">
          <el-option
              v-for="l in language"
              :key="l.id"
              :label="l.name"
              :value="l.id"></el-option>
        </el-select>
      </div>
      <div class="input-style">
        <div class="input-info-style">个性签名：</div>
        <el-input v-model="user.signature"/>
      </div>
      <div class="input-style">
        <div style="float: left;margin-top: 5px;" class="input-info-style">头像：</div>
        <el-upload ref="upload"
                   class="upload-demo" :data="{'id':this.$store.state.sLogin.users.id}"
                   action="http://localhost:8888/user/upload"
                   :limit="1"
                   :auto-upload="false">
          <el-button size="medium" type="primary">选择</el-button>
        </el-upload>
      </div>

      <div class="input-style" style="margin-bottom: 0px;">
        <el-button class="submit-style" size="large" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "AccountSetting",
  data() {
    return {
      user: {},//用户信息
      gender: [
        {
          label: "女",
          value: 0,
        },
        {
          label: "男",
          value: 1,
        },
      ],//性别
      language: [],//偏好语言
    };
  },
  methods: {
    //修改昵称点击事件
    updateUserName() {
      this.$prompt('此次修改会消耗您10M币', '修改昵称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPlaceholder:'放松放松',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        if (this.user.point < 1)
          messageTips(this, '修改失败，您的M币不足！', "warning");
        else {
          this.updateName(value);
        }
      }).catch(() => {
      });
    },
    //修改用户昵称
    updateName(value) {
      axios({
        url: "/user/updateUserName",
        method: "post",
        data: qs.stringify({
          name: value,
          id: this.user.id,
          point: this.user.point,
        })
      }).then(response => {
            if (response.data === "success") {
              messageTips(this, '修改成功', "success");
              //修改成功后，修改昵称
              this.user.name = value;
              //修改M币
              this.$store.state.sLogin.users.point -= 10;
              localStorage.setItem("id", this.$store.state.sLogin.users.point);
            } else if (response.data === "nameError")
              messageTips(this, '啊哦，不好意思，您的昵称已被注册！', "warning");
            else
              messageTips(this, '啊哦，未知错误，请重试！', "error");
          },
          error => {
            console.log("updateUserName 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取用户信息
    async searchUser() {
      axios({
        url: "/user/searchUserById",
        method: "post",
        data: qs.stringify({
          id: localStorage.getItem("id"),
        })
      }).then(response => {
            if (response.data) {
              this.user = response.data;
            } else
              messageTips(this, '啊哦，请求数据失败!', "warning");
          },
          error => {
            console.log("searchUserById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //查询语言list
    async searchLanguage() {
      axios({
        url: "/user/searchLanguageList",
        method: "post",
      }).then(response => {
            if (response.data)
              this.language = response.data;
            else
              messageTips(this, '啊哦，请求数据失败!', "warning");
          },
          error => {
            console.log("searchUserById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //提交事件
    submit() {
      //用户没有上传图片时就不提交图片
      if (this.$refs.upload.uploadFiles.length == 1)
        this.$refs.upload.submit();
      //格式化日期格式
      let birthday = this.moment(this.user.birthday).format("YYYY-MM-DD HH:mm:ss");
      axios({
        url: "/user/updateUser",
        method: "post",
        data: qs.stringify({
          id: this.user.id,
          email: this.user.email,
          sex: this.user.sex,
          birthday: birthday,
          prefer_language: this.user.prefer_language,
          signature: this.user.signature,
        })
      }).then(response => {
            if (response.data)
              messageTips(this, '修改成功！', "success");
            else
              messageTips(this, '修改失败！', "warning");
          },
          error => {
            console.log("updateUser 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    }
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchLanguage();
    this.searchUser();
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 700);
    console.log(this.moment(this.user.birthday).format("YYYY-MM-DD HH:mm:ss"));
  },
  updated() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 700);
  }
}
</script>

<style scoped>
.input-style {
  margin: 20px 0px;
}

.input-info-style {
  margin-bottom: 5px;
}

.submit-style {
  background-color: #21BA45;
  color: #FFFFFF;
  width: 110px;
}
</style>