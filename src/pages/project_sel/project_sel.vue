<template>
  <div>
    <div class="nav-bar">
      <div class="title">
        筛选条件
      </div>
    </div>
    <div class="selectLeb">
      <van-dropdown-menu>
        <van-dropdown-item :title=tabsName>
          <van-field
            readonly
            clickable
            label="支持类别"
            :value="value"
            placeholder="选择类别"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            label="支持类型"
            :value="valueType"
            placeholder="选择类型"
            @click="showPickerType = true"
          />
          <van-popup v-model="showPickerType" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsType"
              @cancel="showPickerType = false"
              @confirm="onConfirmType"
            />
          </van-popup>
        </van-dropdown-item>
        <!--<van-dropdown-item title="公司地址" ref="areaitem">-->
          <!--<van-area :area-list="areaList" value="610000" @confirm='confirmFn' @cancel="cancelFn"/>-->
        <!--</van-dropdown-item>-->
        <van-dropdown-item :title=tabsTime>
          <van-field
            readonly
            clickable
            label="开始时间"
            :value="currentDateValue"
            placeholder="选择开始时间"
            @click="showPickerTime = true"
          />
          <van-popup v-model="showPickerTime" position="bottom" >
            <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              title="开始时间"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm='timeconfirmFn'
              @cancel="showPickerTime = false"
              />
          </van-popup>
          <van-field
            readonly
            clickable
            label="结束时间"
            :value="currentDateENdValue"
            placeholder="选择结束时间"
            @click="showPickerTimeEnd = true"
          />
          <van-popup v-model="showPickerTimeEnd" position="bottom">
            <van-datetime-picker
              v-model="currentDateENd"
              type="datetime"
              title="结束时间"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm='timeconfirmFnEnd'
              @cancel="showPickerTimeEnd = false"
            />
          </van-popup>


        </van-dropdown-item>
        <van-dropdown-item :title=tabsType>
          <van-field
            readonly
            clickable
            label="项目类型"
            :value="valueBigType"
            placeholder="选择类型"
            @click="showPickerBigType = true"
          />
          <van-popup v-model="showPickerBigType" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsBigType"
              @cancel="showPickerBigType = false"
              @confirm="onConfirmBigType"
            />
          </van-popup>

          <van-field
            readonly
            clickable
            label="项目明细"
            :value="valueDetailed"
            placeholder="选择明细"
            @click="showPickerDetailed = true"
          />
          <van-popup v-model="showPickerDetailed" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsDetailed"
              @cancel="showPickerDetailed = false"
              @confirm="onConfirmDetailed"
            />
          </van-popup>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="list_layout">
      <div class="list_ont">
        <div class="title">
          <div class="name">客户信息</div>
        </div>
        <div class="mmnum">
          <input placeholder="￥最低金额" v-model="minAmount">
          <span class="zhi">~</span>
          <input placeholder="￥最高金额" v-model="maxAmount">
        </div>
        <div class="checkmmnum">
          <div v-for='(item,index) in arr' :class='{bg:index==isactive}' @click='fn(index)'>
            ￥{{item}}以上
          </div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">项目来源</div>
        </div>
        <div class="checksource">
          <div v-for='(item,index) in arrsource' :class='{bg:index==isactiveSource}' @click='fnSource(index)'>
            {{item}}
          </div>
        </div>
      </div>

      <div class="list_ont">
        <div class="title">
          <div class="name">客户姓名</div>
        </div>
        <div class="peopleName">
          <input v-model="peopleNameValue" placeholder="客户姓名:">
        </div>
      </div>

      <div class="buttonGroup">
        <button class="butRes" @click="reSelect"><van-icon name="replay" />重置</button>
        <button class="butOk" @click="sureSelect">确 定</button>
      </div>
    </div>

    <div style="height: 50px;"></div>
    <van-tabbar route v-model="active" active-color="#ee3d4a" inactive-color="#a1a1a1">
      <van-tabbar-item icon="bars" to="/">项目列表</van-tabbar-item>
      <van-tabbar-item icon="diamond" to="/ProjectSel">项目检索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import AddressInfo from '../../../static/area.js'
  import formatDate from '../../../static/date.js'
  export default {
    name: "project_sel",
    data() {
      return {
        tabsName: '公司支持',
        tabsTime: '项目时间',
        tabsType: '项目类型',
        active:1,
        minAmount:'', // 最低金额
        maxAmount:'', // 最高金额
        value: '', // 支持类别
        valueKey:'', // 支持类别key
        valueType: '', // 支持类型
        valueTypeKey: '', // 支持类型key
        valueBigType: '', // 项目大类
        valueBigTypeKey: '', // 项目大类Key
        valueDetailed: '', // 项目明细
        valueDetailedKey: '', // 项目明细Key
        showPicker: false,
        showPickerType: false,
        showPickerBigType: false,
        showPickerDetailed: false,
        showPickerTime: false,
        showPickerTimeEnd: false,
        columns: [], // 支持类别
        columnsType: [{text:'请先选择支持类别',key:""}],
        columnsBigType: [], // 项目类型
        columnsDetailed: [{text:'请先选择项目类型',key:""}], // 项目明细
        areaList: AddressInfo,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(), // 开始时间选择组件时间
        currentDateValue:'', // 开始时间选择格式化后时间
        currentDateENd: new Date(), // 结束时间选择组件时间
        currentDateENdValue:'', // 结束时间选择格式化后时间
        isactive:4, //默认第4个有样式
        arr:['1000','5000','10000'],
        isactiveSource:5, //默认第5个有样式
        arrsource:['LSC','BID','CMD','其他'],
        peopleNameValue:'' // 客户姓名
      }
    },
    mounted() {
      // 获取筛选查询选项
      this.getProjectFilter();
    },
    methods: {
      // 获取筛选查询大类选项
      getProjectFilter(){
        this.$api.get(
          "/getProjectFilter",
          {},
          response => {
            let res = response.data;
            if (res.code === "200") {
              for(let i=0;i<res.data.projectTypeList.length;i++){
                this.columnsBigType.push({text:res.data.projectTypeList[i].name,key:res.data.projectTypeList[i].id})
              }
              for(let x=0;x<res.data.supportTypeList.length;x++){
                this.columns.push({text:res.data.supportTypeList[x].name,key:res.data.supportTypeList[x].id})
              }
            }
            else{
              this.$toast.fail('筛选条件获取失败！');
            }
          }
        );
      },
      // 获取筛选查询公司明细选项
      getProjectDetailed_C(val){
        this.columnsType = []; // 先置空，隐藏默认提示
        this.$api.get(
          "/getProjectSubFilter",
          {
            id:val
          },
          response => {
            let res = response.data;
            if (res.code === "200") {
              for(let i=0;i<res.data.projectTypeList.length;i++){
                this.columnsType.push({text:res.data.projectTypeList[i].name,key:res.data.projectTypeList[i].id})
              }
            }
            else{
              this.$toast.fail('筛选条件获取失败！');
            }
          }
        );
      },
      // 获取筛选查询项目类型明细选项
      getProjectDetailed_B(val){
        this.columnsDetailed = []; // 先置空，隐藏默认提示
        this.$api.get(
          "/getProjectSubFilter",
          {
            id:val
          },
          response => {
            let res = response.data;
            if (res.code === "200") {
              for(let i=0;i<res.data.projectTypeList.length;i++){
                this.columnsDetailed.push({text:res.data.projectTypeList[i].name,key:res.data.projectTypeList[i].id})
              }
            }
            else{
              this.$toast.fail('筛选条件获取失败！');
            }
          }
        );
      },
      // 公司支持，支持类别选项确定事件
      onConfirm(picker, values) {
        this.value = picker.text;
        this.valueKey = picker.key;
        this.getProjectDetailed_C(this.valueKey);
        if(this.valueKey != ''){
          this.tabsName = '已选';
        }
        this.showPicker = false;
      },
      // 公司支持，支持类型选项确定事件
      onConfirmType(picker, values){
        if(picker.key != ''){
          this.valueType = picker.text;
          this.valueTypeKey = picker.key;
          if(this.valueTypeKey != ''){
            this.tabsName = '已选';
          }
        }
        this.showPickerType = false;
      },
      // 项目类型，项目大类选项确定事件
      onConfirmBigType(picker, values){
        this.valueBigType = picker.text;
        this.valueBigTypeKey = picker.key;
        this.getProjectDetailed_B(this.valueBigTypeKey);
        if(this.valueBigTypeKey != ''){
          this.tabsType = '已选'
        }
        this.showPickerBigType = false;
      },
      // 项目类型，项目明细选项确定事件
      onConfirmDetailed(picker, values){
        if(picker.key != ''){
          this.valueDetailed = picker.text;
          this.valueDetailedKey = picker.key;
          if(this.valueDetailedKey != ''){
            this.tabsType = '已选'
          }
        }
        this.showPickerDetailed = false;
      },
      cancelFn(){ // 地区选择取消按钮
        this.$refs.areaitem.toggle();
      },
      confirmFn(val){ // 地区选择确定按钮
        this.$refs.areaitem.toggle();
      },
      // 项目时间
      timecancelFn(){ // 开始时间选择取消按钮
        this.showPickerTime = false;
      },
      timeconfirmFn(val){ // 开始时间选择确定按钮
        this.currentDateValue = this.dateFormat(val);
        if(this.currentDateValue!=''){
          this.tabsTime = '已选';
        }
        this.showPickerTime = false;
      },
      timecancelFnEnd(){
        this.showPickerTimeEnd = false;
      },
      timeconfirmFnEnd(val){
        this.currentDateENdValue = this.dateFormat(val);
        if(this.currentDateENdValue!=''){
          this.tabsTime = '已选';
        }
        this.showPickerTimeEnd = false;
      },
      // 时间格式化
      dateFormat(date) {
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
      // 点击设置定值金额，动态切换背景属性
      fn (index) {
        //点击切换 变量的值 赋值为 index
        this.isactive=index;
        this.minAmount = this.arr[index];
      },
      // 点击项目来源，动态切换背景属性
      fnSource (index) {
        //点击切换 变量的值 赋值为 index
        this.isactiveSource=index;
      },
      // 确定查询
      sureSelect(){
        // 最低金额不为空，最高金额为空
        if(this.minAmount !='' && this.maxAmount ==''){
          this.$toast.fail('最高金额不能为空！');
          return false;
        }
        // 最低金额为空，最高金额不为空
        if(this.minAmount == '' && this.maxAmount != ''){
          this.$toast.fail('最低金额不能为空！');
          return false;
        }
        if(parseInt(this.minAmount) > parseInt(this.maxAmount)){
          this.$toast.fail('最低金额不能大于最高金额！');
          return false;
        }
        // 开始时间不为空，结束时间为空
        if(this.currentDateValue!='' && this.currentDateENdValue == ''){
          this.$toast.fail('结束时间不能为空！');
          return false;
        }
        // 开始时间为空，结束时间不为空
        if(this.currentDateValue=='' && this.currentDateENdValue != ''){
          this.$toast.fail('开始时间不能为空！');
          return false;
        }
        if(this.currentDateValue > this.currentDateENdValue){
          this.$toast.fail('开始时间不能大于结束时间！');
          return false;
        }
        this.$router.push({path: '/',query:{
          select:"b1000", // 查询标识
          minAmount:this.minAmount, // 项目金额最低
          maxAmount:this.maxAmount, // 项目金额最高
          projectSource:this.arrsource[this.isactiveSource], // 项目来源
          customerName:this.peopleNameValue, // 客户姓名
          support:this.valueKey, // 支持类别
          subSupport:this.valueTypeKey, // 支持明细
          startDate:this.currentDateValue, // 开始时间
          endDate:this.currentDateENdValue, // 结束时间
          projectType:this.valueBigTypeKey, // 项目大类
          subType:this.valueDetailedKey // 项目明细
        }});
      },
      reSelect(){
        this.$router.push({path: '/',query:{
            select:"b1001", // 查询标识
          }});
      }
    }
  }

</script>

<style scoped>
  .nav-bar{
    height: 65px;
    background-color: #cb2627;
    width: 100%;
    overflow: hidden;
    display: flex;
  }
  .nav-bar .title{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
  .list_layout{
    margin: 15px;
    background: #f4f4f4;
  }
  .list_ont{
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    padding: 10px;
    margin: 20px 6px;
  }
  .list_ont .title{
    overflow: auto;
    font-size: 14px;
    color: #444444;
    font-weight: bold;
    border-bottom: 1px dashed #d8d8d8;
    padding-bottom: 6px;
    text-indent: 12px;
  }
  .list_ont .name{
    width: 100%;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .mmnum{
    display: flex;
    justify-content: space-between;
    margin: 16px 10px;
  }
  .mmnum input{
    width: 120px;
    border-radius: 20px;
    border: 1px solid #cb2627;
    background: #cb262736;
    height: 22px;
    text-align: center;
    font-size: 12px;
    color: black;
    font-weight: bold;
  }
  .mmnum input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #cd2629;
    /* placeholder字体大小  */
    font-size: 12px;
  }
  .mmnum .zhi{
    margin-top: 4px;
    font-weight: bold;
    color: #cb2627;
  }
  .checkmmnum{
    display: flex;
    justify-content: space-between;
    margin: 16px 10px;
  }
  .checkmmnum div{
    width: 90px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 24px;
    line-height: 24px;
    background: #f4f4f4;
    color: #777777;
  }
  .bg {
    color: #fff !important;
    background: #d10f0f !important;
  }
  .checksource{
    display: flex;
    justify-content: space-between;
    margin: 16px 10px;
  }
  .checksource div{
    width: 60px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 24px;
    line-height: 24px;
    background: #f4f4f4;
    color: #777777;
  }
  .peopleName{
    margin: 16px 10px;
  }
  .peopleName input{
    width: 100%;
    color: #777777;
    font-size: 12px;
    height: 22px;
    border: 0;
  }
  .peopleName input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #777777;
    /* placeholder字体大小  */
    font-size: 12px;
  }
  .buttonGroup{
    display: flex;
    justify-content: space-around;
  }
  .butOk{
    width: 240px;
    background: #cb2627;
    color: #fff;
    font-size: 14px;
    border: 0;
    border-radius: 20px;
    height: 30px;
    line-height: 30px;
  }
  .butRes{
    width: 70px;
    font-size: 12px;
    height: 30px;
    border: 0;
    background: #2f1282;
    color: #fff;
    border-radius: 50px;
    text-align: center;
  }
  .van-dropdown-item__content{
    max-height: 100%;
  }
</style>
