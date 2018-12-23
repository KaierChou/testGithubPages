<template>
  <div v-show="!isLoading">
     <!-- 标准套餐 S -->
    <div class="container mb8">
      <h2 class="title">请定制您的体检方案</h2>
      <div class="package">
        <header class="package-title">
          <span></span>
          <h3>{{resData.base_package.title}}</h3>
        </header>
        <section>
          <div class="package-base" v-for="(item, index) in resData.base_package.list" :key="index">
            <div>
              <p>{{ item.package_name }}</p>
              <p @click.stop="enterDetail(item.id)">
                <span>{{ item.brief }}</span>
                <span class="right-arrow"></span>
              </p>
            </div>
            <div>
              <ComRadio
                type='white'
                :name="index.toString()"
                :value="selectPackage"
                @input="handleSelectPackage"
              ></ComRadio>
              <span>必选</span>
            </div>
          </div>
          <div class="optional-list">
            <div class="optional-item" v-for="(item, index) in resData.base_package.item" :key="index">
              <div>
                <p>{{ item.package_name }}</p>
                <p>{{ item.desc }}</p>
              </div>
              <ComCheckbox
                @click="checkboxChange"
                :checked="checkbox[index]"
                :value="item.name"
                :index="index"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- 标准套餐 E -->

    <!-- 免费加项 S -->
    <div class="container mb60">
      <div class="free-item">
        <header class="free-title mb20">
          <span></span>
          <h3>{{resData.free_package.title}}</h3>
          <p>{{resData.free_package.desc}}</p>
        </header>
        <!-- 加项list -->
        <section class="other-item-list">
          <div class="other-item" v-for="(item, index) in this.getFreeAddItem" :key="index" @click.stop='viewDetail(item)'>
            <!-- <img :src="item.img_small"> -->
            <img v-lazy="item.img_small">
            <div class="item-info">
              <p>{{item.package_name}}</p>
              <p>{{item.brief}}</p>
              <p>
                ¥ {{item.price}}
                <span>起</span>
              </p>
              <p>{{item.org_another_name}}</p>
            </div>
            <div class="item-select">
              <!-- 普通员工只能选一个 -->
              <ComRadio v-if="resData.free_package.is_radio"
                class='radio'
                :name="index.toString()"
                :value="selectRadio"
                @input="handleSelectRadio"
                @click="abortSelect(index)"
              ></ComRadio>
              <!-- 中干以上员工能选二个 -->
              <ComCheckbox v-else
                class='radio'
                square
                @click="freeItemSelect"
                :checked="freeItemCheckbox[index]"
                :value="item.id"
                :index="index"
              ></ComCheckbox>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- 免费加项 E -->

    <!-- 底部按钮 S -->
    <div class="next">
      <ComBtn type="biggest" @click="handleNext" :disable="disable">下一步</ComBtn>
    </div>
    <!-- 底部按钮 E -->

    <!-- Dialog S -->
    <ComDialog :title="dialogTitle" :content='dialogContent' :showDialog='showDialog' @close='closeDialog' />
    <!-- Dialog E -->
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import ComBtn from '@/components/common/button'
import ComRadio from '../../components/common/com-radio/radio.vue'
import ComCheckbox from '../../components/common/com-checkbox/checkbox.vue'
import ComDialog from '../../components/common/dialog.vue'
import { saveStorage, cleanStorage } from '../../assets/js/cache.js'
export default {
  components: {
    ComBtn,
    ComRadio,
    ComCheckbox,
    ComDialog
  },
  data() {
    /* eslint-disable */
    return {
      isLoading: true,
      disable: true,
      radioIsSelected: false,     // 免费加项点击取消用的
      selectPackage: '-1',        // 必选的标准套餐 radio
      checkbox: [],               // 标准套装下面的 可选项 选中标记  
      selectRadio: '-1',          // 普通员工只能选一个非免加项 radio标记
      freeItemCheckbox: [],       // 中干以上员工 免费加项可选2个, checkbox 标记
      freeItemCheckboxList: [],   // 中干以上员工 免费加项可选2个, checkbox 选中的id
      selectPackageStats: {       // 选中记录, 跨页面传值用
        package_id: 0,            // 选的标准套餐id 
        is_marry: 0,              // 是否选中结婚
        check_hepatitis_b: 0,     // 是否选中乙肝检查
        free_add_item_ids: '',    // 免费加项id, 乙肝id也要
        main_package_name: '',    // 主套餐名 (给机构页用)
        free_package_name: []     // 套餐名 (给机构页用)
      },
      resData: {
        base_package: {
          item: []
        },
        free_package: {
          list: []
        },
        pay_package: {},
        intelligence_package: {}
      },
      dialogTitle: '',
      dialogContent: '',
      showDialog: false
    }
    /* eslint-enable */
  },
  computed: {
    // 免费加项会根据是否选中 婚检 而进行过滤
    getFreeAddItem: function() {
      if (this.selectPackageStats.is_marry) {
        return this.resData.free_package.list.filter((ele, index) => {
          return ele.is_marry === '1' || ele.is_marry === '3'
        })
      } else {
        return this.resData.free_package.list.filter((ele, index) => {
          return ele.is_marry === '2' || ele.is_marry === '3'
        })
      }
    }
  },
  methods: {
    ...mapActions(['getPackageList']),
    ...mapMutations(['SET_SELECTEDPACKAGEINFO', 'CLEAN_SELECTEDPACKAGEINFO', 'CLEAN_SHOPPINGLIST', 'SET_ISREMODIFYPACKAGES', 'SET_SHOPPINGLIST']),
    getData(cityId) {
      cleanStorage()
      this.getPackageList(cityId).then(
        res => {
          if (res.code === 0) {
            if (res.data.base_package.list.length === 1) { // 普通员工默认选中标准套餐
              this.selectPackage = '0'
              this.selectPackageStats.package_id = res.data.base_package.list[0].id
              this.selectPackageStats.main_package_name = res.data.base_package.list[0].package_name
              this.disable = false
            }
            res.data.free_package.list.forEach(ele => {
              ele.select = false
            })
            res.data.base_package.item.forEach(ele => {
              ele.select = false
            })
            this.resData = res.data
          } else {
            this.$toast.fail(res.message)
          }
          this.isLoading = false
          this.$comLoading.isLoading(false)
        },
        err => {
          this.$toast.fail(err.toString())
          this.$comLoading.isLoading(false)
        }
      )
    },
    enterDetail(id) {
      this.$router.push({ path: `/custom-package-detail/${id}` })
    },
    viewDetail(item) {
      this.dialogTitle = item.package_name
      this.dialogContent = item.brief
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    handleSelectPackage(index) {
      this.selectPackage = index
      this.selectPackageStats.package_id = this.resData.base_package.list[index].id
      this.selectPackageStats.main_package_name = this.resData.base_package.list[index].package_name
      this.disable = false
    },
    handleSelectRadio(index) {
      this.selectRadio = index
      this.selectPackageStats.free_add_item_ids = this.resData.free_package.list[index].id
      this.radioIsSelected = true
    },
    abortSelect(index) {
      if (this.radioIsSelected === true) {
        if (index.toString() === this.selectRadio) {
          this.selectRadio = '-1'
          this.radioIsSelected = false
          this.selectPackageStats.free_add_item_ids = ''
          this.selectPackageStats.free_package_name.length = 0
        }
      }
    },
    checkboxChange(val, index) {
      if (val === 'is_marry') {
        this.selectPackageStats.is_marry = this.selectPackageStats.is_marry ? 0 : 1
        this.freeItemCheckbox.length = 0
        this.freeItemCheckboxList.length = 0
      } else {
        this.selectPackageStats.check_hepatitis_b = this.selectPackageStats.check_hepatitis_b ? 0 : 1
        this.resData.base_package.item[index].select = !this.resData.base_package.item[index].select
        if (this.resData.base_package.item[index].select) {
          this.selectPackageStats.free_package_name.push(this.resData.base_package.item[index].package_name)
        } else {
          let hepatitis_b = this.resData.base_package.item[index].package_name
          this.selectPackageStats.free_package_name.forEach((ele, index) => {
            if (ele === hepatitis_b) {
              this.selectPackageStats.free_package_name.splice(index, 1)
            }
          })
        }
        this.SET_SHOPPINGLIST(this.resData.base_package.item[index])
      }
      this.$set(this.checkbox, index, !this.checkbox[index])
    },
    // 中干选2个免费加项的
    freeItemSelect(val, index) {
      if (this.freeItemCheckboxList.length >= 2) {
        // console.log("2个及以上")
        if (this.freeItemCheckbox[index]) {
          this.freeItemCheckboxList.splice(this.freeItemCheckboxList.indexOf(val), 1)
          this.$set(this.freeItemCheckbox, index, !this.freeItemCheckbox[index])
        }
      } else {
        // console.log('2个以下')
        if (!this.freeItemCheckbox[index]) {
          this.freeItemCheckboxList.push(val)
        } else {
          this.freeItemCheckboxList.splice(this.freeItemCheckboxList.indexOf(val), 1)
        }
        this.$set(this.freeItemCheckbox, index, !this.freeItemCheckbox[index])
      }
      this.selectPackageStats.free_add_item_ids = this.freeItemCheckboxList.join(',')
    },
    handleNext() {
      if (this.disable) return
      if (this.resData.free_package.is_radio) { // 普通员工
        for (let i = 0; i < this.resData.free_package.list.length; i++) {
          if (this.resData.free_package.list[i].id === this.selectPackageStats.free_add_item_ids) {
            this.selectPackageStats.free_package_name.push(this.resData.free_package.list[i].package_name)
            this.resData.free_package.list[i].select = true
            this.SET_SHOPPINGLIST(this.resData.free_package.list[i])
            break
          }
        }
      } else { // 中干员工
        if (this.selectPackageStats.free_add_item_ids.indexOf(',') === -1) { // 只选了一个
          for (let i = 0; i < this.resData.free_package.list.length; i++) {
            if (this.resData.free_package.list[i].id === this.selectPackageStats.free_add_item_ids) {
              this.selectPackageStats.free_package_name.push(this.resData.free_package.list[i].package_name)
              this.resData.free_package.list[i].select = true
              this.SET_SHOPPINGLIST(this.resData.free_package.list[i])
              break
            }
          }
        } else { // 选了两
          let freeArr = this.selectPackageStats.free_add_item_ids.split(',')
          this.resData.free_package.list.forEach((ele, index) => {
            if (ele.id === freeArr[0] || ele.id === freeArr[1]) {
              this.selectPackageStats.free_package_name.push(ele.package_name)
              this.resData.free_package.list[index].select = true
              this.SET_SHOPPINGLIST(ele)
            }
          })
        }
      }
      let freeIdArr = this.selectPackageStats.free_add_item_ids.split(',')
      if (this.selectPackageStats.check_hepatitis_b) { // 如果选中乙肝
        this.resData.base_package.item.forEach(ele => {
          if (ele.name === 'check_hepatitis_b') {
            freeIdArr.push(ele.id)
          }
        })
        this.selectPackageStats.free_add_item_ids = freeIdArr.join()
      }
      this.SET_SELECTEDPACKAGEINFO(this.selectPackageStats)
      saveStorage('sessionState', this.$store.state)
      this.$router.push({ name: 'custom-add-items' })
    }
  },
  mounted() {
    this.CLEAN_SHOPPINGLIST()
    this.CLEAN_SELECTEDPACKAGEINFO()
    this.SET_ISREMODIFYPACKAGES(false)
    // const cityId = this.$route.query.city_id
    this.getData(200)
  },
  created() {
    this.$comLoading.isLoading(true)
  },
  beforeMount() {
    this.$Lazyload.config({ lazyComponent: true, loading: 'https://i.ibb.co/tLXYkZw/item-placeholder.png', error: 'https://i.ibb.co/tLXYkZw/item-placeholder.png' })
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/var.less";
.container {
  position: relative;
  background-color: #fff;
  overflow: auto;
  width: 100%;
}
.title {
  font-family: PingFangSC-Medium;
  font-size: 22PX;
  padding: 16px 0px;
  margin: 0 16px;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px dashed #c6d2d4;
  background-color: #fff;
}
.package {
  font-family: PingFangSC-Regular;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 16px 0 16px;
  .package-title {
    text-align: left;
    margin-bottom: 16px;
    span {
      display: inline-block;
      width: 4px;
      height: 16px;
      line-height: 24px;
      vertical-align: middle;
      background-color: #32cbe4;
      margin-right: 5px;
    }
    h3 {
      font-family: PingFangSC-Medium;
      display: inline-block;
      font-size: 17px;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 4px;
    }
  }
  .package-base {
    box-sizing: border-box;
    width: 343px;
    height: 80px;
    color: @white;
    font-size: 12px;
    line-height: 17px;
    margin: 0 auto;
    padding: 14px 17px 15px 12px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-image: linear-gradient(-133deg, #2adfec 0%, #32cbe4 100%);
    box-shadow: 0 4px 25px 0 rgba(100, 160, 171, 0.2);
    border-radius: 8px;
    & > div:first-child {
      height: 100%;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      & > p:first-child {
        font-size: 17px;
        line-height: 24px;
      }
      & > p:last-child {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        line-height: 17px;
        span {
          display: block;
        }
        & > span:first-child {
          max-width: 207px;
          margin-right: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .right-arrow {
          margin-left: 2px;
          color: @white;
          width: 4.5px;
          height: 8.1px;
          background: url("../../assets/images/btn_arrow_next_white.svg")
            no-repeat center;
          background-size: 4.5px 8.1px;
        }
      }
    }
    & > div:last-child {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      & > .need-icon {
        margin-top: 4px;
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background: url("../../assets/images/ic_choose_white.svg") no-repeat
          center;
        background-size: 18px 18px;
      }
    }
  }
  .optional-list {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 17px;
    color: #000;
    .optional-item {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      & > div:first-child {
        margin-left: 10px;
        flex: 1;
        height: 100%;
        & > p:last-child {
          margin-top: 1px;
          color: @gray;
        }
      }
      & > div:last-child {
        margin-right: 21px;
      }
    }
  }
}
.free-item {
  font-family: PingFangSC-Regular;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 16px 0 16px;
  .free-title {
    text-align: left;
    margin-bottom: 16px;
    span {
      display: inline-block;
      width: 4px;
      height: 16px;
      line-height: 24px;
      vertical-align: middle;
      background-color: #32cbe4;
      margin-right: 5px;
    }
    h3 {
      font-family: PingFangSC-Medium;
      display: inline-block;
      font-size: 17px;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 4px;
    }
    p {
      font-size: 12px;
      color: #9b9b9b;
      line-height: 17px;
    }
  }
  .other-item-list {
    overflow: auto;
    .other-item {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      line-height: 17px;
      margin-bottom: 40px;
      img {
        width: 84px;
        height: 84px;
        margin-right: 12px;
      }
      .item-info {
        p:nth-child(1) {
          font-family: PingFangSC-Medium;
          font-size: 17px;
          line-height: 24px;
          margin-bottom: 2px;
        }
        p:nth-child(2) {
          display: -webkit-box;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          width: 181px;
          font-size: 12px;
          color: #9b9b9b;
          margin-bottom: 5px;
        }
        p:nth-child(3) {
          font-family: DIN-Medium;
          font-size: 17px;
          color: #ff4545;
          line-height: 21px;
          margin-bottom: 4px;
          span {
            font-size: 12px;
          }
        }
        p:nth-child(4) {
          width: 204px;
          display: -webkit-box;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 12px;
          color: #32cbe4;
        }
      }
      .item-select {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .radio {
          margin-top: 33px;
        }
      }
    }
  }
}

.next {
  box-sizing: border-box;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  padding: 8px 16px;
  width: 100%;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 -3px 25px 0 rgba(100, 160, 171, 0.2);
}
.mb60 {
  margin-bottom: 60px;
}
.mb20 {
  margin-bottom: 20px;
}
.mb8 {
  margin-bottom: 8px;
}
</style>
