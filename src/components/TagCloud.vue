<template>
  <div>
    <div class="tag-title"><strong>标签云</strong></div>
    <div id="wordCloud" style="height: 320px; width: 350px;"></div>
  </div>
</template>

<script>
//引入标签云相关依赖
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import axios from "axios";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "TagCloud",
  data() {
    return {
      echartsData: [],
    };
  },
  methods: {
    //初始化标签云
    initChart() {
      let myChart = echarts.init(document.getElementById('wordCloud'));
      // this.searchTagCloudList();
      // console.log("2",this.echartsData);
      let option = {
        title: {
          text: '',
          x: "center"
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 40],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              color: function () {
                return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                );
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            //数据
            data: this.echartsData
          }
        ]
      };
      myChart.setOption(option);
      // 点击某个字
      myChart.on('click', function (params) {
        console.log('myChart----click---:', params, '------', params.data)
      });
    },
    //查询所有的标签
    searchTagCloudList() {
      // this.echartsData.unshift();
      //获取标签list
      axios({
        url: "/problems/searchTagCloudList",
        method: "post",
      }).then(response => {
            if (response.data) {
              this.echartsData = response.data;
            } else {
              messageTips(this, '啊哦，请求标签失败', "error");
            }
          },
          error => {
            console.log("searchTagCloudList请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          });
    },
  },
  created() {

  },
  mounted() {
    this.searchTagCloudList();
    //axios是异步获取数据，如果不让标签云初始化函数延迟执行，就会出现无效数据
    setTimeout(() => {
      this.initChart();
    }, 200)
  }

}
</script>

<style scoped>
.tag-title {
  font-size: 19px;
  margin-left: 50px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>