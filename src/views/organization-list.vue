<template>
  <div id="OrganizationList" v-show="!isLoading">
    <div class="page_ti">请选择你要体检的机构</div>
    <div class="sup_hospital" id="main">
      <div class="list">
        <Hospital
          v-for="item in hospitalList"
          :key="item.org_id"
          :type="'support'"
          :info="item"
          @chooseTips="chooseTips"
        />
      </div>
    </div>
    <div class="tips_line">以下医院不支持已选检查项</div>
    <div class="unsup_hospital">
      <div class="list">
        <Hospital v-for="item in hospitalList_un" :key="item.org_id" :info="item"/>
      </div>
    </div>
    <van-dialog
      class="set_dialog"
      v-model="dialog.show"
      confirm-button-text="坚持选择"
      cancel-button-text="再看看"
      show-cancel-button
      :before-close="beforeClose"
    >
      <div class="ctn">
        <span class="up">是否坚持选择{{dialog.hospital}}？</span>
        <span class="dw">{{dialog.unsupportTab}}</span>
      </div>
    </van-dialog>
    <dataPicker
      :schedule="schedule"
      :show="scheduleShow"
      @toggleDate="toggleDate"
      @closeSchedule="closeSchedule"
    ></dataPicker>
    <ComLoading v-if="isLoading"></ComLoading>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Dialog, Toast } from 'vant'
import ComLoading from '@/components/common/loading.vue'
import { organizationList, orgSchedule } from '@/assets/js/http/index'
import Hospital from '@/components/organization-list/hospital.vue'
import dataPicker from '@/components/common/com-picker/date-picker'
import { getStorageItem } from '../assets/js/cache.js'
import Vue from 'vue'
Vue.use(Dialog)
export default {
  name: 'OrganizationList',
  components: {
    Hospital,
    ComLoading,
    dataPicker
  },
  computed: {
    ...mapGetters(['getSelectedPackageInfo'])
  },
  data() {
    return {
      isLoading: true,
      src: '',
      hospitalList: [],
      hospitalList_un: [],
      dialog: {
        show: false,
        hospital: '',
        unsupportTab: ''
      },
      schedule: {},
      scheduleShow: false,
      activeArg: {}
    }
  },
  mounted() {
    let selectedPackageInfo
    if (JSON.stringify(this.getSelectedPackageInfo) === '{}') {
      selectedPackageInfo = getStorageItem('sessionState').selectedPackageInfo
      this.SET_STORE(getStorageItem('sessionState'))
    } else {
      selectedPackageInfo = this.getSelectedPackageInfo
    }
    var city = 200
    var lonlag = '115.111222,23.112311'
    var mainpack = selectedPackageInfo.main_package_name
    var packages = selectedPackageInfo.free_package_name.concat(selectedPackageInfo.pay_packageName).join()
    organizationList(city, lonlag, mainpack, packages).then(
      res => {
        if (res !== null) {
          if (res.code === 0) {
            this.hospitalList = res.data.enable
            this.hospitalList_un = res.data.disable
          } else {
            this.$toast.fail('请求异常')
          }
        } else {
          this.$toast.fail('请求出错')
        }
        this.isLoading = false
      },
      err => {
        console.log(err)
        this.$toast.fail('系统异常')
        this.isLoading = false
      }
    )
  },
  methods: {
    ...mapMutations(['SET_SELECTEDPACKAGEINFO', 'SET_STORE']),
    beforeClose(action, done) {
      if (action === 'confirm') {
        done()
        this.chioceDate()
      } else {
        done()
      }
    },
    chioceDate() {
      orgSchedule({
        org_id: this.activeArg.org_id,
        package_id: this.getSelectedPackageInfo.package_id,
        free_add_item_ids: this.getSelectedPackageInfo.free_add_item_ids,
        pay_add_item_ids: this.getSelectedPackageInfo.pay_add_item_ids
      })
        .then((res) => {
          if (res.code === 0) {
            this.schedule = res.data
            this.scheduleShow = true
          } else {
            Toast('排期错误')
          }
        })
    },
    chooseTips(arg) {
      this.activeArg = arg
      if (arg.tips_org_no_items_str !== undefined) {
        var dialog = this.dialog
        dialog.show = true
        dialog.hospital = arg.name
        dialog.unsupportTab = arg.tips_org_no_items_str
      } else {
        this.chioceDate()
      }
    },
    closeSchedule() {
      this.scheduleShow = false
    },
    toggleDate(date) {
      let medicalTime = {
        medical_date: date.date
      }
      this.SET_SELECTEDPACKAGEINFO(medicalTime)
      this.$router.push({
        name: 'apply'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";
#OrganizationList {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: @white;
  .page_ti {
    font-size: 22px;
    line-height: 30px;
    color: @text-color;
    padding: 16px 0;
    margin: 0 16px;
    border-bottom: #c6d2d4 2px dashed;
  }
  .sup_hospital {
    padding: 0 16px;
    .list {
      width: 100%;
      height: auto;
      padding-top: 22px;
    }
  }
  .tips_line {
    padding: 8px 16px;
    font-size: 14px;
    line-height: 20px;
    color: @gray;
    background-color: @background-color;
  }
  .unsup_hospital {
    padding: 0 16px;
    .list {
      width: 100%;
      height: auto;
      padding-top: 20px;
    }
  }
  .set_dialog {
    width: 275px;
    height: auto;
    border-radius: 8px;
    .ctn {
      padding: 25px 25px 18px 25px;
      .up {
        width: 100%;
        height: auto;
        font-size: 16px;
        line-height: 24px;
        color: @text-color;
        text-align: center;
        display: block;
      }
      .dw {
        width: 100%;
        height: auto;
        font-size: 12px;
        line-height: 18px;
        color: @gray;
        text-align: center;
        display: block;
        margin-top: 8px;
      }
    }
  }
}
</style>
