<template>
  <div>
    <div class="nav-bar">
      <input class="nav-select-name" v-model="proName" placeholder="请输入项目名称" />
      <i class="select-icon" @click="selectProject"></i>
      <!--<div class="title_right">-->
        <!--<i class="screening-icon"></i>-->
      <!--</div>-->
    </div>

    <div class="list_layout">
      <div class="nodata" v-if="nodata"><van-divider dashed>暂无数据</van-divider></div>
      <div @click="viewInfo(item)" class="list_ont" v-for="(item,index) in projects" :key="index">
        <div class="title">
          <div class="name">{{item.projectName}}</div>
          <div class="type">${{item.projectAmount}}</div>
        </div>
        <div class="info">
          <div class="infol">
            <div>项目编号: {{item.projectNo}} &nbsp&nbsp&nbsp&nbsp&nbsp 类型: {{item.projectType}}</div>
            <div>项目负责人: {{item.projectLeader}} &nbsp&nbsp&nbsp&nbsp&nbsp 负责人电话: {{item.leaderMobile}}<van-icon name="phone" style="color: #f00 !important;font-weight: bold;font-size: 16px;top: 3px;left: 4px;"/></div>
            <div>公司名称: {{item.companyName}}</div>
            <div>招标时间: {{item.estBidDate}} &nbsp&nbsp&nbsp&nbsp&nbsp 状态: {{item.projectStatus}}</div>
          </div>
          <!--<div class="infor">-->
            <!--<div class="state">{{item.projectStatus}}</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>

    <div style="height: 50px;"></div>
    <van-tabbar route v-model="active" active-color="#ee3d4a" inactive-color="#a1a1a1">
      <van-tabbar-item icon="bars" to="/">项目列表</van-tabbar-item>
      <van-tabbar-item icon="diamond" to="/ProjectSel">项目检索</van-tabbar-item>
    </van-tabbar>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name: "project_list",
    data() {
      return {
        show: false,
        proName: "",
        active: 0,
        projects: [],
        nodata: false
      };
    },
    mounted() {
      // 初始化页面数据
      this.initData();
    },
    methods: {
      initData() {
        let that = this;
        if(that.$route.query.select == 'b1000'){
          if(that.$route.query.projectSource == undefined){
            that.$route.query.projectSource='';
          }
          that.show=true;
          this.$api.post(
            "/getProjectWithFilter",
            {
              minAmount: that.$route.query.minAmount, // 项目金额最低
              maxAmount: that.$route.query.maxAmount, // 项目金额最高
              projectSource: that.$route.query.projectSource, // 项目来源
              customerName: that.$route.query.customerName, // 客户名称
              startDate: that.$route.query.startDate, // 开始日期
              endDate: that.$route.query.endDate, // 结束日期
              city: "", // 城市
              location: "", // 地区选择
              projectType: that.$route.query.projectType, // 项目类型
              subType: that.$route.query.subType, // 项目明细
              subSupport: that.$route.query.subSupport, // 支持明细
              support:  that.$route.query.support// 支持类别
            },
            response => {
              that.show=false;
              let res = response.data;
              if (res.code === "200") {
                if(res.data.length == 0){
                  this.nodata = true;
                }
                else{
                  that.projects = res.data;
                }
              }
              else{
                this.$toast.fail('系统异常！');
              }
            }
          );
        }
        else{ // 初始化查询
          that.show=true;
          this.$api.post(
            "/getProjectList",
            {
              customerNo: "", // 客户ID
              userId: "1", // 用户 id
              projectName: '' // 项目名称
            },
            response => {
              that.show=false;
              let res = response.data;
              console.log(res);
              if (res.code === "200") {
                if(res.data.length == 0){
                  this.nodata = true;
                }
                else{
                  that.projects = res.data;
                }
              }
              else{
                this.$toast.fail('系统异常！');
              }
            }
          );
        }
      },
      viewInfo(project) {
        this.$router.push({ path: `/ProjectInfo/${project.projectNo}` });
      },
      // 根据项目名称查询列表
      selectProject(){
        this.show=true;
        this.$api.post(
          "/getProjectWithFilter",
          {
            minAmount: "", // 项目金额最低
            maxAmount: "", // 项目金额最高
            projectSource: "", // 项目来源
            customerName: "", // 客户名称
            startDate: "", // 开始日期
            endDate: "", // 结束日期
            city: "", // 城市
            location: "", // 地区选择
            projectType: "", // 项目类型
            subType: "", // 项目明细
            subSupport: "", // 支持明细
            support:  "",// 支持类别
            projectName: this.proName // 项目名称
          },
          response => {
            this.show=false;
            let res = response.data;
            if (res.code === "200") {
              if(res.data.length == 0){
                this.projects =[];
                this.nodata = true;
              }
              else{
                this.projects = res.data;
                this.nodata = false;
              }
            }
            else{
              this.$toast.fail('系统异常！');
            }
          }
        );
      }
    }
  };
</script>

<style scoped>
  .nav-bar {
    height: 65px;
    background-color: #cb2627;
    width: 100%;
    overflow: hidden;
    display: flex;
  }
  .nav-select-name {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: 30px;
    border: 0;
    border-radius: 20px;
    padding-left: 12px;
  }
  .select-icon {
    position: absolute;
    right: 0;
    z-index: 5;
    background-image: url(../../assets/select.png); /*引入图片图片*/
    background-size: 70%;
    background-repeat: no-repeat; /*设置图片不重复*/
    background-position: 0px 0px; /*图片显示的位置*/
    width: 25px; /*设置图片显示的宽*/
    height: 25px; /*图片显示的高*/
    margin-right: 20px;
    margin-top: 25px;
  }
  .screening-icon {
    position: absolute;
    z-index: 5;
    background-image: url(../../assets/screening.png); /*引入图片图片*/
    background-size: 70%;
    background-repeat: no-repeat; /*设置图片不重复*/
    background-position: 0px 0px; /*图片显示的位置*/
    width: 25px; /*设置图片显示的宽*/
    height: 25px; /*图片显示的高*/
    margin-top: 6px;
    margin-left: 16px;
    float: right;
  }
  .title_right {
    width: 60px;
    height: 36px;
    float: right;
    margin-top: 20px;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #bbbbbb;
    /* placeholder字体大小  */
    font-size: 10px;
  }
  .list_layout {
    margin: 15px;
    background: #f4f4f4;
  }
  .list_ont {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 10px #ccc;
    padding: 10px;
    margin: 20px 6px;
  }
  .list_ont .number {
    overflow: auto;
    font-size: 12px;
    color: #777777;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .list_ont .title {
    overflow: auto;
    font-size: 14px;
    color: #444444;
    font-weight: bold;
    border-bottom: 1px dashed #d8d8d8;
    padding-bottom: 6px;
  }
  .list_ont .name {
    width: 80%;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list_ont .type {
    width: 20%;
    float: right;
    font-weight: bold;
    color: #cb2627;
  }
  .list_ont .info {
    display: flex;
    justify-content: space-around;
  }
  .list_ont .infol {
    padding: 14px;
    font-size: 12px;
    color: #777777;
    width: 100%;
  }
  .list_ont .infol i{
    color: #f00;
  }
  .list_ont .infor {
    padding: 14px 22px;
    font-size: 12px;
    color: #777777;
    width: 100px;
  }
  .list_ont .infor .state {
    font-size: 14px;
    font-weight: bold;
    text-align: right;
    color: #df0e0e;
  }
  .list_ont .info .infol div {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .list_ont .info .infor div {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .nodata{
    margin-top: 40px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
