<template>
  <div class="houseDetail">
    <!-- <div class="titleContainer">易享家WAP端测试版</div> -->
    <div class="statusContainer" v-if="houseData.fbType==1">
      <img v-show="houseData.aduit==0" src="../assets/images/status01.png" alt="">
      <img v-show="houseData.aduit==1 && houseData.aduitStatus==1" src="../assets/images/status05.png" alt="">
      <img v-show="houseData.aduit==1 && houseData.aduitStatus==2" src="../assets/images/status04.png" alt="">
      <img v-show="houseData.aduit==1 && houseData.aduitStatus==3" src="../assets/images/status03.png" alt="">
      <img v-show="houseData.aduit==1 && houseData.aduitStatus==4" src="../assets/images/status02.png" alt="">
    </div>
    <swiper auto loop height='245px' dots-position='center' :list="swiperList" v-model="swiperIndex"></swiper>
    <div class="houseInfo">
      <p class="title">{{houseData.name}}</p>
      <div class="price">
        <span>AU${{houseData.rentalPrice}}</span>
        <span>{{houseData.rentalPriceUnit === 'WEEK'?'每周': houseData.rentalPriceUnit === 'MONTH'?'每月': houseData.rentalPriceUnit === 'YEAR'?'每年':''}}</span>
      </div>
      <div class="tags">
        <span>退订灵活</span>
        <span>接受短租</span>
        <span>全套家具</span>
      </div>
      <!-- <div class="collectContainer">
          <img src="../assets/images/collected.png" alt="" v-show="houseData.collected">
          <img src="../assets/images/collect.png" alt="" v-show="!houseData.collected">
		    </div> -->
    </div>
    <div class="houseFacility">
      <p class="location">{{houseData.location}}</p>
      <div class="facilityContainer">
        <div class="facilityItem">
          <img src="../assets/images/bed.png" alt="">
          <span>{{houseData.bedroomNum}}</span>
        </div>
        <div class="facilityItem">
          <img src="../assets/images/bath.png" alt="">
          <span>{{houseData.toiletNum}}</span>
        </div>
        <div class="facilityItem">
          <img src="../assets/images/park.png" alt="">
          <span>{{houseData.parkNum}}</span>
        </div>
        <div class="facilityItem">
          <span>{{houseData.houseType=='APARTMENT'?'公寓': houseData.houseType=='HOUSE'?'别墅': houseData.houseType=='TOWNHOUSE'?'联排别墅': houseData.houseType=='STUDIO'?'全套单间': houseData.houseType=='UNIT'?'单元房': houseData.houseType=='OTHERS'?'其他':'' }}</span>
          <span>{{houseData.rentalType === 'STUDIO'?'单间/STUDIO': houseData.rentalType === 'WHOLE'?'整租/WHOLE': houseData.rentalType === 'PART'?'分租/PART': houseData.rentalType === 'SUBLET'?'转租/SUBLET': houseData.rentalType === 'STUDENT-APARTMENT'?'学生公寓/STUDENT-APARTMENT': houseData.rentalType === 'HOME-STAY'?'寄宿家庭/HOME-STAY': ''}}</span>
        </div>
      </div>
      <p class="warning" v-show="houseData.fbType==1 && houseData.aduit==0"><img src="../assets/images/warning.png" alt=""> 此房源或发布者未经过平台实名认证！</p>
    </div>
    <div class="houseDesc">
      <p>房源介绍</p>
      <p>{{houseData.introduction}}</p>
    </div>
    <div class="houseContain">
      <div :class="houseData.fbType==1?'tabContainer':''">
        <tab bar-active-color='#fe5932' active-color='#fe5932' :line-width=2 v-model="activeTab">
          <tab-item v-for="(tab,index) in houseContain.tab" :key="index">{{tab}}</tab-item>
        </tab>
      </div>
      <swiper v-model="activeTab" height="80px" :show-dots="false">
        <swiper-item v-for="(item,index) in houseContain.content" :key="index">
          <ul class="tab-swiper">
            <template v-if="item && item.length">
              <li v-for="(todo,k) in item" :key="k">
                <img :src="todo.icon" alt="">
                <span>{{todo.chineseName}}</span>
              </li>
            </template>
            <li v-else>
              <span>暂无数据</span>
            </li>
          </ul>
        </swiper-item>
      </swiper>
    </div>
    <div class="mapContainer">
      <p>地图</p>
      <el-amap class="maps_box" :vid="'amap-vue'" :center="position" :plugin="plugin" :zoom="zoom" :gridMapForeign="true">
        <el-amap-marker :position="position"></el-amap-marker>
      </el-amap>
    </div>
    <div class="nearContain" v-if="houseData.fbType==0">
      <div class="tabContainer">
        <tab bar-active-color='#fe5932' active-color='#fe5932' :line-width=2 v-model="activeTab2">
          <tab-item v-for="(tab,index) in nearContain.tab" :key="index">{{tab}}</tab-item>
        </tab>
      </div>
      <swiper v-model="activeTab2" height="80px" :show-dots="false">
        <swiper-item v-for="(item,index) in nearContain.content" :key="index">
          <div class="tab-swiper">
            <p>{{item}}</p>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="recommendContainer">
      <p class="recommendTitle">相似推荐</p>
      <scroller lock-y :scrollbar-x=false>
        <ul class="recommendList">
          <li class="recommendItem" v-for="(item,index) in houseData.similarHouses" :key="index" @click="goDetail(item.houseId)">
            <img class="cover" :src="item.cover" alt="">
            <p class="title">{{subStr(item.title)}}</p>
            <ul class="facility">
              <li>
                <img src="../assets/images/bed.png" alt="">
                <span>{{item.bedroomNum}}</span>
              </li>
              <li>
                <img src="../assets/images/bath.png" alt="">
                <span>{{item.toiletNum}}</span>
              </li>
              <!-- <li>
                  <img src="../assets/images/park.png" alt="">
                  <span>{{item.parkNum}}</span>
                </li> -->
            </ul>
            <div class="price">
              <span>AU${{item.rentalPrice}}</span>
              <span>{{item.rentalPriceUnit === 'WEEK'?'每周': item.rentalPriceUnit === 'MONTH'? '每月': item.rentalPriceUnit === 'YEAR'?'每年': ''}}</span>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
    <div class="footer">
      <img class="logo" src="../assets/images/logo.png" alt="">
      <div class="concat">
        <span>+61 021-8015-8467</span>
        <span>info@clozhome.com</span>
      </div>
      <div class="linkList">
        <a href="">关于我们</a>
        <a href="">联系我们</a>
        <a href="">商务合作</a>
        <a href="">招贤纳士</a>
        <a href="">用户协议</a>
        <a href="">隐私条款</a>
        <a href="">退款政策</a>
        <a href="">平台规则</a>
      </div>
    </div>
    <div class="orderContainer">
      <ul class="concatContainer">
        <li @click="call">
          <img src="../assets/images/tel.png" alt="">
          <p>电话</p>
        </li>
        <li>
          <img src="../assets/images/wx.png" alt="">
          <p>微信</p>
        </li>
        <li>
          <img src="../assets/images/consult.png" alt="">
          <p>咨询</p>
        </li>
      </ul>
      <span class="orderBtn" @click="$router.push('/home')">一键下单</span>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Swiper, SwiperItem, XButton, Tab, TabItem, Scroller, Toast } from "vux";
export default {
  name: "",
  data() {
    return {
      houseData: {},
      swiperIndex: 0,
      swiperList: [],
      activeTab: 0,
      activeTab2: 0,
      zoom: 15,
      plugin: [
        {
          pName: "ToolBar",
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        }
      ],
      position: ["147.084503", "-37.863874"],
    };
  },
  mounted() {
    this.getDetail();
  },
  computed: {
    houseContain() {
      if (this.houseData.fbType == 0) {
        return {
          tab: ['室内设施', '公共设施', '房屋包含', '安全与健康', '房屋规定'],
          content: [this.houseData.indoorFacilities, this.houseData.publicFacilities, this.houseData.rentContains, this.houseData.safetyHealth, this.houseData.houseRegulations]
        }
      } else {
        return {
          tab: ['室内设施', '公共设施'],
          content: [this.houseData.indoorFacilities, this.houseData.publicFacilities]
        }
      }
    },
    nearContain() {
      return {
        tab: ['附近学校', '附近交通', '附近设施'],
        content: [this.houseData.nearbySchool, this.houseData.nearbyTraffic, this.houseData.nearbyFacilities]
      }
    }
  },
  methods: {
    async getDetail() {
      const res = await this.$get({
        url: 'mxj/house/info',
        data: {
          houseId: this.$route.query.id
        }
      })
      if (res.code === 0) {
        const { data } = res;
        this.houseData = data;
        this.position = [data.longitude, data.latitude];
        this.swiperList = data.housePictures.map(item => {
          return {
            url: 'javascript:',
            img: item,
            title: ''
          }
        })
      } else {
        this.$vux.toast.show({
          text: data.message
        })
      }
    },
    subStr(val) {
      if (val.length > 30) {
        return val.substr(0, 30) + '...'
      } else {
        return val;
      }
    },
    goDetail(id) {
      this.$router.push({ path: "/detail?id=" + id });
      location.reload();
    },
    call() {
      window.location.href = "tel:021 8015 8467";
    }
  },
  components: {
    Swiper,
    SwiperItem,
    XButton,
    TabItem,
    Tab,
    Scroller,
    Toast
  }
};
</script>

<style lang="scss" scoped>
$color: #fe5932;
.houseDetail {
  position: relative;
  min-height: 100vh;
  background: #fafafa;
  padding-bottom: Px(100);
  .titleContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: Px(90);
    line-height: Px(90);
    color: #ffffff;
    background: $color;
    font-size: Px(34);
    text-align: center;
    z-index: 1000;
  }
  .statusContainer {
    display: inline-block;
    position: absolute;
    right: 0;
    top: Px(120);
    z-index: 100;
    img {
      width: Px(163);
      height: Px(68);
    }
  }
  .houseInfo {
    position: relative;
    padding: Px(30) Px(20);
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    .title {
      font-size: Px(34);
      font-weight: bold;
    }
    .price {
      margin: Px(30) 0;
      span:first-child {
        font-size: Px(34);
        color: $color;
        margin-right: Px(15);
      }
      span:last-child {
        font-size: Px(24);
        color: #999999;
      }
    }
    .tags {
      overflow: hidden;
      span {
        float: left;
        width: Px(127);
        height: Px(40);
        text-align: center;
        line-height: Px(40);
        color: #ffffff;
        font-size: Px(24);
        margin-right: Px(20);
        &:first-child {
          background-color: #8bc34a;
        }
        &:nth-child(2) {
          background-color: #329bea;
        }
        &:nth-child(3) {
          background-color: #fe5932;
        }
      }
    }
    .collectContainer {
      position: absolute;
      right: Px(41);
      bottom: Px(26);
      padding: Px(4);
      img {
        width: Px(43);
        height: Px(43);
      }
    }
  }
  .houseFacility {
    padding: Px(30) Px(20);
    margin: Px(30) 0;
    border-top: Px(1) solid #e5e5e5;
    border-bottom: Px(1) solid #e5e5e5;
    background: #ffffff;
    .location {
      font-size: Px(26);
      color: #333;
      font-weight: bold;
    }
    .facilityContainer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: Px(30);
      font-size: Px(26);
    }
    .facilityItem {
      display: flex;
      margin-right: Px(25);
      color: #a0a0a0;
      &:last-child {
        border-left: Px(1) solid #999999;
        padding-left: Px(20);
        span:first-child {
          margin-right: Px(25);
          border-right: Px(1) solid #999999;
          padding-right: Px(25);
        }
      }
      img {
        width: Px(46);
        height: Px(34);
        margin-right: Px(15);
      }
    }
    .warning {
      margin-top: Px(40);
      display: flex;
      align-items: center;
      color: #e00b3e;
      font-size: Px(24);
      img {
        width: Px(24);
        height: Px(24);
        margin-right: Px(15);
      }
    }
  }
  .houseDesc {
    border-top: Px(1) solid #e5e5e5;
    border-bottom: Px(1) solid #e5e5e5;
    background: #ffffff;
    padding: Px(30) Px(20);
    p:first-child {
      font-size: Px(30);
      color: #333;
      font-weight: bold;
      margin-bottom: Px(20);
    }
    p:last-child {
      font-size: Px(28);
      line-height: Px(46);
      color: #999999;
    }
  }
  .houseContain {
    font-size: Px(26);
    color: #a7a7a7;
    padding: Px(1) 0;
    margin: Px(30) 0;
    border-top: Px(1) solid #e5e5e5;
    border-bottom: Px(1) solid #e5e5e5;
    background: #ffffff;
    .tabContainer {
      padding-right: 60%;
      background: linear-gradient(
          180deg,
          #e5e5e5,
          #e5e5e5,
          rgba(229, 229, 229, 0)
        )
        bottom left no-repeat;
      background-size: 100% 1px;
    }
    .vux-tab .vux-tab-item {
      font-size: Px(26);
      color: #a7a7a7;
    }
    .tab-swiper {
      padding: Px(15) Px(20);
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        margin: Px(15) Px(20);
        align-items: center;
        span {
          font-size: Px(26);
          color: #999999;
        }
        img {
          width: Px(32);
          height: Px(26);
          margin-right: Px(15);
        }
      }
    }
  }
  .mapContainer {
    padding: Px(30) Px(20);
    border-top: Px(1) solid #e5e5e5;
    border-bottom: Px(1) solid #e5e5e5;
    background: #ffffff;
    p {
      font-size: Px(30);
      color: #333;
      margin-bottom: Px(30);
    }
    .maps_box {
      width: 100%;
      height: Px(435);
    }
  }
  .nearContain {
    margin-top: Px(30);
    border-top: Px(1) solid #e5e5e5;
    border-bottom: Px(1) solid #e5e5e5;
    background: #ffffff;
    color: #666666;
    font-size: Px(28);
    .tabContainer {
      padding-right: 40%;
      background: linear-gradient(
          180deg,
          #e5e5e5,
          #e5e5e5,
          rgba(229, 229, 229, 0)
        )
        bottom left no-repeat;
      background-size: 100% 1px;
    }
    .vux-tab .vux-tab-item {
      font-size: Px(26);
      color: #a7a7a7;
    }
    .tab-swiper {
      padding: Px(30) Px(20);
      line-height: Px(52);
    }
  }
  .recommendContainer {
    margin-top: Px(30);
    border-top: Px(1) solid #e5e5e5;
    border-bottom: Px(1) solid #e5e5e5;
    background: #ffffff;
    padding-bottom: Px(50);
    .recommendTitle {
      font-size: Px(30);
      color: #333;
      line-height: Px(98);
      padding-left: Px(20);
    }
    .recommendList {
      overflow: hidden;
      width: Px(1480);
      padding: 0 Px(10);
      box-sizing: border-box;
      .recommendItem {
        float: left;
        width: Px(345);
        margin: 0 Px(10);
        .cover {
          width: 100%;
          height: Px(250);
        }
        .title {
          font-size: Px(28);
          line-height: Px(38);
          color: #666666;
          margin: Px(20) 0;
        }
        .facility {
          display: flex;
          align-items: center;
          li {
            display: flex;
            align-items: center;
            img {
              width: Px(46);
              height: Px(34);
            }
            span {
              margin: 0 Px(30) 0 Px(20);
            }
          }
        }
        .price {
          margin-top: Px(20);
          span:first-child {
            color: $color;
            font-size: Px(28);
            margin-right: Px(12);
          }
          span:last-child {
            color: #999999;
            font-size: Px(24);
          }
        }
      }
    }
  }
  .footer {
    background: #fafafa;
    height: Px(356);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999999;
    font-size: Px(24);
    .logo {
      width: Px(352);
      height: Px(58);
    }
    .concat {
      margin: Px(30) 0;
      span {
        margin: 0 Px(30);
      }
    }
    .linkList {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    a {
      color: #999999;
      font-size: Px(24);
      margin: 0 Px(38) Px(22);
      text-decoration: none;
    }
  }
  .orderContainer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: Px(100);
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 Px(20) #ccc;
    z-index: 1000;
    .orderBtn {
      width: Px(300);
      height: Px(70);
      text-align: center;
      line-height: Px(70);
      color: #fff;
      background: $color;
      border-radius: Px(8);
      font-size: Px(24);
      margin-right: Px(20);
    }
    .concatContainer {
      display: flex;
      li {
        width: Px(125);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: Px(24);
        &:nth-child(2) {
          position: relative;
          &:before {
            content: '';
            position: absolute;
            width: Px(2);
            background: #c1c1c1;
            left: 0;
            top: Px(5);
            bottom: Px(5);
          }
          &:after {
            content: '';
            position: absolute;
            width: Px(2);
            background: #c1c1c1;
            right: 0;
            top: Px(5);
            bottom: Px(5);
          }
        }
      }
      img {
        width: Px(48);
        height: Px(40);
        margin-bottom: Px(3);
      }
    }
  }
}
</style>
