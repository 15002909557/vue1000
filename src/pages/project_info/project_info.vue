<template>
  <div>
    <div class="nav-bar">
      <div class="title">
        <i class="goback" @click="goBack()"></i>
        项目详情
      </div>
    </div>

    <div class="list_layout">
      <div class="list_ont">
        <div class="title">
          <div class="name">客户信息</div>
        </div>
        <div class="companyName" :customerNo="customer.customerNo">{{customer.customerName}}</div>
        <div class="info">
          <div>发展规模:{{customer.developmentScale}}&nbsp&nbsp&nbsp公司规模:{{customer.companyScala}}</div>
          <div>创立时间:{{customer.createDate}}&nbsp&nbsp&nbsp员工数:{{customer.employee}}</div>
          <div>待/已上市产品:{{customer.products}}&nbsp&nbsp&nbsp融资总金额:{{customer.totalAmount}}亿元</div>
          <div>性质:{{customer.nature}}</div>
          <div>地址:{{customer.address}}</div>
          <div>电话:{{customer.phone}}</div>
          <div>网址:{{customer.siteUrl}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">项目信息</div>
        </div>
        <div class="info">
          <div>编号:{{project.projectNo}}</div>
          <div>公司名称:{{project.companyName}}</div>
          <div>项目类型:{{project.projectType}}&nbsp&nbsp&nbsp项目状态:{{project.projectStatus}}</div>
          <div>省份:接口没有返回&nbsp&nbsp&nbsp城市:{{project.city}}</div>
          <div>项目概况:{{project.projectDescription}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">各部门预估销售能力</div>
        </div>
        <div class="info">
          <div>项目总金额:${{project.projectAmount}}&nbsp&nbsp&nbsp预售潜力:{{project.estTmoAmount}}</div>
          <div>项目赢单率:{{project.projectWinrate}}&nbsp&nbsp&nbsp业务部门:{{project.projectDivision}}</div>
          <div v-for="(item,index) in estimateList" :key="index">
            <div>{{item.departmentNo}}预估产品数量:{{item.estQuantity}}&nbsp&nbsp&nbsp{{item.departmentNo}}预估金额:${{item.estAmount}}</div>
            <div>{{item.departmentNo}}预估赢单率:{{item.estWinrate * 100}}%</div>
          </div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">项目发起人/审核人</div>
        </div>
        <div class="info">
          <div>项目发起人:{{project.projectSponsor}}&nbsp&nbsp&nbsp发起部门:{{project.sponsorDivision}}</div>
          <div>发起人电话:{{project.sponsorMobile}}</div>
          <div>项目审批人:{{project.projectApprover}}&nbsp&nbsp&nbsp发起部门:{{project.approverDivision}}</div>
          <div>审批人电话:{{project.approverMobile}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">负责人 项目成员</div>
        </div>
        <div class="info">
          <div>负责人:{{project.projectLeader}}&nbsp&nbsp&nbsp部门:{{project.leaderDivision}}</div>
          <div>负责人电话:{{project.leaderMobile}}</div>
          <div
            v-for="(item,index) in userList"
            :key="index"
          >{{item.departmentName}}项目组成员:{{item.name}}&nbsp&nbsp&nbsp{{item.departmentName}}成员电话:{{item.phone}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">项目关键时间表</div>
        </div>
        <div class="info">
          <div>立项时间:{{project.estInitiateDate}}&nbsp&nbsp&nbsp招标时间:{{project.estBidDate}}</div>
          <div>签约时间:{{project.estSignDate}}&nbsp&nbsp&nbsp付款时间:{{project.estArrivalDate}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">公司支持</div>
        </div>
        <div class="info">
          <div v-for="(item,index) in projectTypeList" :key="index">{{item.name}}:是 {{item.subName}}</div>
          <!--<div>公司领导支持:是 高层拜访 额外折扣</div>-->
          <!--<div>售后维保服务:是 延长维保 服务响应时间</div>-->
          <!--<div>财务:是 延长收期 提高授信</div>-->
          <!--<div>供应链:是 提前交付 按需提前供应</div>-->
          <!--<div>法务法规:是 其他</div>-->
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">各部门成单金额</div>
        </div>
        <div class="info" v-for="(item,index) in actualAmountList" :key="index">
          <div>{{item.departmentNo}} Booking金额:${{item.booking}}&nbsp&nbsp&nbsp{{item.departmentNo}} Revenue金额:${{item.revenue}}</div>
          <div>{{item.departmentNo}} 赢单产品数量:{{item.actQuantity}}&nbsp&nbsp&nbsp{{item.departmentNo}} 实际赢单率:{{item.actWinrate}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">产品信息</div>
        </div>
        <div
          class="info"
          :productNo="item.productNo"
          v-for="(item,index) in projectProductList"
          :key="index"
        >
          <div>部门:{{item.division}}&nbsp&nbsp&nbsp项目成员:{{item.application}}</div>
          <div>主要产品:{{item.productName}}&nbsp&nbsp&nbsp项目金额:{{item.totalPrice}}</div>
          <div>赢单率:{{item.winrate * 100}}%&nbsp&nbsp&nbsp销售方式:{{item.methodSales}}</div>
          <div>竞争对手:{{item.competitor}}</div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">机会信息</div>
        </div>
        <div class="info" v-for="(item,index) in chanceInfoList" :key="index">
          <div>机会名称:{{item.chanceName}}</div>
          <div>阶段:{{item.phase}}&nbsp&nbsp&nbsp可能性:{{item.winRate * 100}}%</div>
          <div>数量:{{item.quantity}}&nbsp&nbsp&nbsp预定时间:{{item.scheduledTime}}</div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name: "project_info",
    data() {
      return {
        show: false,
        projectNo: "", // 参数项目编号
        customer: {}, // 客户信息
        project: {}, // 项目信息
        estimateList: [], // 各部门预估能力
        userList: [], // 项目组成员
        projectTypeList: [], // 公司支持
        actualAmountList: [], // 各部门成单金额
        projectProductList: [], // 产品信息
        chanceInfoList: [] // 机会信息
      };
    },
    mounted() {
      // 获取地址栏中的参数
      this.projectNo = this.$route.params.projectNo;
      // 页面初始化加载
      this.getInfo();
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.back(-1);
      },
      // 获取项目详细信息
      getInfo() {
        let that = this;
        that.show = true;
        this.$api.post(
          "getProjectDetails",
          {
            projectNo: that.projectNo,
            userId: "1"
          },
          response => {
            that.show = false;
            let res = response.data;
            if (res.code === "200") {
              that.customer = res.data.customer;
              that.project = res.data.project;
              that.estimateList = res.data.estimateList;
              that.userList = res.data.userList;
              that.projectTypeList = res.data.projectTypeList;
              that.actualAmountList = res.data.actualAmountList;
              that.projectProductList = res.data.projectProductList;
              that.chanceInfoList = res.data.chanceInfoList;
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
  .nav-bar .title {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
  .nav-bar .goback {
    position: absolute;
    left: 0;
    z-index: 5;
    background-image: url("../../assets/back.png");
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    width: 20px;
    height: 20px;
    margin-left: 20px;
    margin-top: 2px;
  }

  .list_layout {
    margin: 15px;
    background: #f4f4f4;
  }

  .list_ont {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    padding: 10px;
    margin: 20px 6px;
  }

  .list_ont .title {
    overflow: auto;
    font-size: 14px;
    color: #444444;
    font-weight: bold;
    border-bottom: 1px dashed #d8d8d8;
    padding-bottom: 6px;
    text-indent: 12px;
  }
  .list_ont .name {
    width: 100%;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list_ont .companyName {
    margin: 15px 10px;
    color: #ce2428;
    font-size: 16px;
    font-weight: bold;
  }
  .list_ont .info {
    margin: 15px 10px;
    font-size: 12px;
    color: #777777;
  }
  .list_ont .info div {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
