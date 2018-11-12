<template>
  <div class="hello">
    <section>
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img class="banner" src="@/assets/images/banner.jpg" alt="">
            </div>
            <div class="swiper-slide">
              <img class="banner" src="@/assets/images/banner.jpg" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </section>
    <section>
      <h2 class="big-title">深圳市城市广场B栋娃娃机</h2>
    </section>
    <section>
      <div class="product border-top">
        <div class="product-item" :class="{active: item.active}" v-for="(item,index) in productList" :key="item.id" @click="productSlect(index)">
          <p class="price">
            {{item.price}}元
          </p>
          <p class="virtual-price">
            {{item.virtualPrice}}个萌星币
          </p>
          <span class="give" v-if="item.isGive">送{{item.give}}币</span>
        </div>
      </div>
    </section>
    <section>
      <div class="bottom-bar">
        <div class="bar-content  border-top" >
          <div class="bar-content-item" v-for="(item, index) in tabBarList" :key="item.title" @click="selectTarbar(index)">
            <img :src="item.active? item.iconUrlActive : item.iconUrl ">
            <p>{{item.title}}</p>
          </div>
        </div>
        <div class="ewm-wrap">
          <div class="ewm" >
            <div class="ewm-container">
              <div class="ewm-img-wrap">
                <div class="ewm-img-inner">
                  <img src="@/assets/images/icon_qr_code.png" alt="" v-show="!markStatus" @click="showEWM">
                  <img src="@/assets/images/icon_qr_code_shut_down.png" alt="" v-show="markStatus" @click="hideEWM">
                </div>
              </div>
            </div>
            <p>二维码</p>
          </div>
        </div>
      </div>
    </section>
    <section >
      <transition name="fade">
        <div v-show="markStatus">
          <div class="mark" @click="hideEWM"></div>
          <div class="ewm-wrap-active">
            <img src="@/assets/images/showEwm.png" alt="">
          </div>
        </div>
      </transition>
    </section>

    <section style="margin:0 0 200px">
      <!-- 路由 -->
      <router-link to="/index"> 首页 </router-link>
      <router-link to="/demo/1"> demo页 </router-link>
    </section>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'HelloWorld',
  data () {
    return {
      productList: [
        {
          id:1,
          price: 6,
          "virtualPrice": 24,
          isGive: false,
          give: 0,
          active: true
        }, {
          id:2,
          price: 20,
          "virtualPrice": 24,
          isGive: true,
          give: 10,
          active: false
        }, {
          id:3,
          price: 15,
          "virtualPrice": 24,
          isGive: true,
          give: 30,
          active: false
        }, {
          id:4,
          price: 17,
          "virtualPrice": 24,
          isGive: true,
          give: 60,
          active: false
        }
      ],
      tabBarList: [
        {
          title: "首页",
          iconUrl: require('@/assets/images/icon_home_normal.png'),
          iconUrlActive: require('@/assets/images/icon_home_press.png'),
          active: true
        },{
          title: "我的",
          iconUrl: require('@/assets/images/icon_me_normal.png'),
          iconUrlActive: require('@/assets/images/icon_me_press.png'),
          active: false
        }
      ],
      markStatus: false
    }
  },
  methods: {
    handeSelect(index, arr, targetValue) {
      let tempArr = arr.map((item, p_index) => {
        if(p_index === index) {
          item[targetValue] = true
          return item
        } else {
          item[targetValue] = false
          return item
        }
      })
      return tempArr
    },
    productSlect (index) {
      this.productList = this.handeSelect(index, this.productList, "active")
      
    },
    selectTarbar (index) {
      this.tabBarList = this.handeSelect(index, this.tabBarList, "active")
    },
    showEWM() {
      this.markStatus = true
    },
    hideEWM() {
      this.markStatus = false
    }
  },
  mounted() {
    new Swiper ('.swiper-container', {
      loop: false,
      // 如果需要分页器
      pagination: '.swiper-pagination',
    })        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .swiper-container {
    width: 10rem;
    height: 6.826667rem;
  }
  .banner{
    // width: 10rem;
    width: 750px; /*px*/
  }
  .big-title{
    margin: .733333rem  0;
    font-size: .453333rem;
    color: #36383a;
    text-align: center;
  }

  .product{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: .533333rem .586667rem 2.266667rem;
    .product-item{
      position: relative;
      margin: 0 0 .373333rem 0;
      text-align: center;
      width: 4.08rem;
      height: 1.933333rem;
      border-radius: .2rem;
      border: .026667rem solid #ffd727;
    }
    .price{
      margin: .4rem 0 .293333rem;
      font-size: .453333rem;
    }
    .virtual-price{
      font-size: .32rem;
    }
    .give{
      position: absolute;
      top: -0.013333rem;
      right: -0.013333rem;
      height: .546667rem;
      line-height: .546667rem;
      width: 1.493333rem;
      color: #fff;
      font-size: .266667rem;
      background-color: #ff5105;
      border-top-right-radius: .186667rem;
      border-bottom-left-radius: .546667rem;
    }
    .active{
      background-color: #ffd727;
      .virtual-price{
        color: #ff8227;
      }
    }
    
  }

  .bottom-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 10rem;
    height: 2.266667rem;
    overflow: hidden;
    z-index: 1001;
    .bar-content{
      display: flex;
      justify-content: space-between;
      position: relative;
      top: .933333rem;
      padding: 0 .586667rem;
      height: 1.333333rem;
      background-color: #fff;
    }
    .bar-content-item{
      width: 2.186667rem;
      text-align: center;
    }
    .bar-content-item img{
      display: block;
      margin: .226667rem auto .146667rem;
      width: .72rem;
      height: .6rem;
    }
    .bar-content-item p{
      color: #919191;
      font-size: .32rem;
    }
    
    .ewm-wrap{
      position: absolute;
      height: 2.266667rem;
      top: 0;
      left: 50%;
      transform:translateX(-50%);
      .ewm-container{
        height:1.893333rem;
         .ewm-img-wrap{
          display: block;
          width: 1.893333rem;
          height: 0.9466665rem;
          border-radius: 1.893333rem 1.893333rem 0 0;
          text-align: center;
          background-color: #ffd727;
          .ewm-img-inner{
            margin: 0 auto;
            width: 1.8555rem;
            height: 1.8555rem;
            border-radius: 50%;
            text-align: center;
            line-height: 1.8555rem;
            background-color: #fff;
            img{
              display: inline-block;
              width: 1.44rem;
              height: 1.44rem;
            }
          }
        }
      }
     
      .ewm p{
        text-align: center;
        color: #919191;
        font-size: .32rem;
      }
      
    }
  }
  
  .mark{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
  }
  .ewm-wrap-active{
    position: fixed;
    bottom: 1.3rem;
    left: 0;
    width: 10rem;
    height: 10.96rem;
    z-index: 1000;
    img{
      display: block;
      width: 10rem;
      height: 10.96rem;
    }
  }
  

</style>
