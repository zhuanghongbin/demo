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
      <!-- 
        1. appear appear-active-class 能够让第一次页面刷新就用动画效果
        2. 如果想要动画的基础上添加过度效果，那么就在enter-active-class 和 leave-active-class 中对应再添加fade-enter-active 和fade-leave-class
        3. 如果过渡动画和动画的时间不一致， 那么需要设置type，type="transtion" 表示以过渡动画时间为准
        4. 如果上面3的效果还不能解决动画不一致问题，可以自定义设置动画时长 :duration="5000" 动画时长为5秒，
           也可以分别设置出场动画和离场动画:duration="{enter:5000, leave:3000}" 表示出场动画5秒，离场动画3秒
        5. 如果是动态组件或者多个元素间的动画，那么需要借助 mode="out-in" 表示先隐藏组件后显示新的组件
           eg. <transtion mode="out-in"> <component :is="toggleComponent"></component> </transtion>
      -->
      <transition 
        name="fade"
        type="transtion"
        enter-active-class="animated swing fade-enter-active" 
        leave-active-class="animated swing fade-leave-active"
        appear
        appear-active-class="animated swing fade-enter-active"
      >
        <h2 v-show="flag" class="big-title">深圳市城市广场B栋娃娃机</h2>
      </transition>
      <button class="toggle-btn" @click="toggle">{{flag? "隐藏" : "显示"}}</button>

      <fade :is-show="flag"><p>动画组件封装</p></fade>  
    </section>
    <section>
      <!-- 兄弟组件根据bus传值 -->
      <text-comp :parent-data="val"></text-comp>
      <brother-two ref="brotherOne" :class="{'brother': isBrother}" @handleClick="brotherClick"></brother-two>
      <brother-one ref="brotherTwo" :class="[classArr]" @handleClick="brotherClick"></brother-one>
    </section>
    <section>
      <!-- vuex -->
      <h2 v-show="flag" class="big-title">数量: {{count}}</h2>
      <h2 v-show="flag" class="big-title">年龄: {{age}}</h2>
      <h2 v-show="flag" class="big-title">性别: {{person.sex}}</h2>
      <ul class="product-list">
        <li>商品 - 价格 </li>
        <li v-for="item of product" :key="item.name">{{item.name}} - {{item.price}}</li>
        <li>商品 - 促销价格 </li>
        <li v-for="(item, index) of saleProduct" :key="index">{{item.name}} - {{item.price}}</li>
      </ul>

      <div class="btn-grounp">
        <button class="vuex-btn" @click="plus({num:5})">增加价格</button>
        <button class="vuex-btn" @click="minus({num:2, age:5})">减少价格</button>
        <button class="vuex-btn" @click="addParam">添加性别</button>
      </div>
    </section>
    <section>
      <!-- 列表过度 -->
      <ul>
        <!-- transiton-group 标签里面的元素必须是循环体，而且要加上key值， 动画添加方式和transition一样 -->
        <transition-group name="fade">
          <li v-for="item of listData" :key="item.id"> {{item.name}} {{item.id}}</li>
        </transition-group>
      </ul>
      <button class="toggle-btn" @click="addList">添加元素</button>
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
    <section>
      <!-- 路由 -->
      <router-link to="/index"> 首页 </router-link>
      <router-link :to="{name: 'demo'}"> demo页 </router-link>
      <fade :is-show="true">
        <router-view />
      </fade>
    </section>
    <section>
      <!-- 自定义组件双向绑定 -->
      <input-comp v-model="inputValue"></input-comp>
      <p style="margin: 0 20px;">{{inputValue}}</p>
    </section>
  </div>
</template>

<script>
import animate from 'animate.css'
import Swiper from 'swiper'
import BrotherOne from './Brother1'
import BrotherTwo from './Brother2'
import Fade from './Fade'
import InputComp from './Input'
// vuex 辅助函数
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  props: ['id'], // 这里是路由中的params定义的id
  name: 'Demo',
  data () {
    return {
      inputValue: '自定义组件双向绑定',
      flag: true, // 标题显示隐藏
      isBrother: true,
      classArr: "classArrCss",
      val: '20',
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
      markStatus: false,
      listData: []
    }
  },
  computed: {
    // 最简单的引用，如果引用的值需要重命名，那么需要换成对象的方式
    // ...mapState(["count", "age", "product", "person"]),
    ...mapState({
      count: "count", 
      age: "age",
      product: (state) => state.product,
      person: "person"
    }),
    ...mapGetters(["saleProduct"])
    // count () {
    //   return this.$store.state.count
    // },
    // product () {
    //   return this.$store.state.product
    // },
    // saleProduct () {
    //   return this.$store.getters.saleProduct
    // }
  },
  methods: {
    // 注意如果有参数的话，参数是由调用这个函数传递过来的例如 this.minus({num:2, age:5})
    ...mapMutations(["minus", "addParam"]),
    ...mapActions(["plus"]),
    // 这里假定数据异步请求，所以用了actions中的方法，采用dispatch进行actions中的方法操作
    // plus () {
    //   // 注意传递参数，如果是多个，只能用对象的方式传递。例如 this.$store.dispatch("plus", {num:5, age:6})
    //   // 以载荷形式分发
    //   this.$store.dispatch("plus", {num: 5})

    //   // 以对象的方式分发
    //   this.$store.dispatch({
    //     type: "plus",
    //     num: 5,
    //     age: 6
    //   })
    // },

    // 这里假定数据同步请求，所以用了mutations中的方法，采用commit进行mutations中的方法操作
    // minus () {
    //   this.$store.commit("minus", {num:2})
    // },
    addList () {
      this.listData.push({id: this.listData.length + 1, name: "列表元素"})
    },
    toggle () {
      this.flag = !this.flag
    },
    brotherClick (val) {
      console.log(this.$refs.brotherOne.brotherVal + this.$refs.brotherTwo.brotherVal)
    },
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
    console.log(this.$route.params, 'param参数')
    console.log(this.id, "通过路由设置props来设置params获取到的id")
    new Swiper ('.swiper-container', {
      loop: false,
      // 如果需要分页器
      pagination: '.swiper-pagination',
    })
  },
  components: {
    BrotherOne,
    BrotherTwo,
    Fade,
    InputComp
  },
  beforeRouteEnter (to, from, next) {
    // 这里不能获取到this，但是可以在next的回调参数中拿到this（这里用vm表示）
    console.log('beforeRouteEnter')
    next(vm => {
      console.log("这里的vm就是this", vm.id)
    })
  },
  beforeRouteUpdate () {
    console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 一般用来用户填了表单，但是没有保存就跳转了，这里可以弹出一个对话框让用户选择是否直接离开还是保存后离开
    console.log('beforeRouteLeave')
    if (global.confirm("你是否确定离开")) {
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .product-list{
    margin: 20px auto;
    width: 600px;
    border: 1px solid #ccc;
    li{
      font-size: 36px;
      line-height: 42px;
      padding: 10px;
    }
  }
  .btn-grounp{
    // margin: 0 auto;
    text-align: center;
    margin: 20px 0;
    .vuex-btn{
      display: inline-block;
      width: 100px;
      height: 60px;
      outline: none;
      border: solid 1px blue;
      border-radius: 10px;
      text-align: cenger;
      background-color: #fff;
    }
  }
  
  .toggle-btn{
    display: block;
    width: 100px;
    height: 60px;
    outline: none;
    border: solid 1px blue;
    border-radius: 10px;
    text-align: cenger;
    background-color: #fff;
    margin: 0 auto;
  }
  .brother{
    font-size: 26px;
    border: 1px solid red;
    padding: 5px;
  }
  .classArrCss{
    font-size: 26px;
    border: 1px solid blue;
    padding: 5px;
  }
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
