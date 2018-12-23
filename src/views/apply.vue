<template>
  <div class="page_" v-show="!loading">
    <div>
      <Package :result="packageData"></Package>
      <reservationInfo :data="reservationData"></reservationInfo>
      <person-info
        @selectMarried="selectMarried"
        @selectBirthday="selectBirthday"
        :data="personInfoData"
        @checkoutInfo="checkoutInfo"
        @hideError="hideError"
        ref="personInfo"
        :error="error"
      ></person-info>
      <order-info
        :data="orderInfoData"
        @selectReport="selectReport"
        @selectReportAddr="selectReportAddr"
        @checkoutInfo="checkoutInfo"
        @hideError="hideError"
        ref="orderInfo"
        :error="error"
      ></order-info>
      <com-picker
        :title="comPicker.title"
        :pickerShow="comPicker.pickerShow"
        :columns="comPicker.columns"
        @onPickerConfirm="onPickerConfirm"
        @onPickerCancel="onPickerCancel"
      ></com-picker>
      <Datetime-picker
        :pickerShow="DatetimePicker.pickerShow"
        @onDatetimePickerCancel="onDatetimePickerCancel"
        @onDatetimePickerConfirm="onDatetimePickerConfirm"
      ></Datetime-picker>
      <fixed-bottom :disable="submitDisable" @click="submit" :price="price"></fixed-bottom>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<style lang='less' scoped>
.page_ {
  padding-bottom: 115px;
}
</style>

<script>
import Package from '@/components/form/package'
import orderInfo from '@/components/form/orderInfo'
import personInfo from '@/components/form/personInfo'
import reservationInfo from '@/components/form/reservationInfo'
import fixedBottom from '@/components/common/fixed/fixed-bottom'
import comPicker from '@/components/common/com-picker/picker' // 底部弹窗
import DatetimePicker from '@/components/common/com-picker/DatetimePicker' // 日期弹窗
import Loading from '@/components/common/loading' // 日期弹窗
import { orderComfirmInfo } from '@/assets/js/http/index'
import { testIdCard, getType, testPhone } from '@/assets/js/util'
import { orderReserve } from '@/assets/js/http'
import { mapGetters, mapMutations } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'apply',
  components: {
    Package,
    reservationInfo,
    personInfo,
    orderInfo,
    comPicker,
    DatetimePicker,
    fixedBottom,
    Loading
  },
  data() {
    return {
      comPickerType: '',
      comPicker: {
        title: '',
        columns: [],
        pickerShow: false
      },
      DatetimePicker: {
        pickerShow: false
      },
      packageData: [],
      personInfoData: { married: {} },
      orderInfoData: { report: {}, reportAddr: {} },
      info: {},
      error: {},
      checkoutType: ['name', 'id_num', 'birthday', 'phone', 'report', 'married', 'reportAddr'],
      submitDisable: true,
      price: 0,
      reservationData: {},
      loading: true
    }
  },

  created() {
    this.load()
  },
  methods: {
    load() {
      orderComfirmInfo({
        city_id: 200,
        package_id: this.getSelectedPackageInfo.package_id,
        free_add_item_ids: this.getSelectedPackageInfo.free_add_item_ids,
        pay_add_item_ids: this.getSelectedPackageInfo.pay_add_item_ids
      }).then((res) => {
        if (res.code === 0) {
          this.reservationData = {
            org_name: res.data.org_name,
            medical_time: this.getSelectedPackageInfo.medical_date
          }
          this.packageData = res.data.package_list
          let reportType = []
          let reportTypeAddr = []
          if (res.data.get_report_type) {
            for (let key in res.data.get_report_type) {
              reportType.push({
                value: key,
                text: res.data.get_report_type[key]
              })
            }
            res.data.get_report_type = reportType
            this.orderInfoData.report = reportType[0]
          }
          if (res.data.office_addr) {
            for (let key in res.data.office_addr) {
              reportTypeAddr.push({
                value: key,
                text: res.data.office_addr[key]
              })
            }
            res.data.office_addr = reportTypeAddr
            this.orderInfoData.reportAddr = reportTypeAddr[0]
          }

          this.info = res.data
          this.price = res.data.total_price
          this.personInfoData = this.personInfoDataFilter(res.data.user_info)
          this.checkoutInfo('', 'default')
          this.loading = false
        } else {
          alert(res.msg)
        }
      })
    },

    ...mapMutations(['SET_SELECTEDPACKAGEINFO']),

    personInfoDataFilter(item) { // 初始化数据
      for (var key in item) {
        if (item[key]) {
          item[key + 'Default'] = item[key]
        } else {
          item[key + 'Default'] = null
        }
      }
      item.married = {
        text: '未婚',
        value: 1
      }
      // 判断是否身份证
      let info = testIdCard(String(item['id_num']))
      // let info = testIdCard( String('420204199411036813') ) //读取身份证
      if (getType(info, 'Array')) {
        // item.ageDefault = item.age ? item.age : info[2]
        // item.age = item.age ? item.age : info[2]
        item.birthday = item.birthday ? item.birthday : info[1]
        item.birthdayDefault = item.birthday ? item.birthday : info[1]
      }
      return item
    },

    selectMarried(item) {
      this.comPickerType = 'married'
      this.$set(this.comPicker, 'columns', item)
      this.$set(this.comPicker, 'pickerShow', true)
    },

    selectBirthday() {
      this.$set(this.DatetimePicker, 'pickerShow', true)
    },

    selectReport() {
      this.comPickerType = 'report'
      this.$set(this.comPicker, 'columns', this.info.get_report_type)
      this.$set(this.comPicker, 'pickerShow', true)
    },

    selectReportAddr() {
      this.comPickerType = 'reportAddr'
      this.$set(this.comPicker, 'columns', this.info.office_addr)
      this.$set(this.comPicker, 'pickerShow', true)
    },
    // selectAge(item) {
    //   this.comPickerType = 'age'
    //   this.$set(this.comPicker, 'pickerShow', true)
    //   this.$set(this.comPicker, 'columns', item)
    // },

    onDatetimePickerCancel() {
      this.pickerHideFun()
    },

    onDatetimePickerConfirm(value) {
      var date = this.parseData(new Date(value))
      this.$set(this.personInfoData, 'birthday', date)
      this.pickerHideFun()
      this.checkoutInfo('birthday')
    },

    onPickerCancel() {
      this.pickerHideFun()
    },

    onPickerConfirm(value, index) {
      switch (this.comPickerType) {
        // case 'age':
        //     this.setAge(value);
        // break;
        case 'married':
          this.setMarried(value)
          break
        case 'report':
          this.setReport(value)
          break
        case 'reportAddr':
          this.setReportAddr(value)
          break
        default:
      }
      this.pickerHideFun()
      this.checkoutInfo(this.comPickerType)
    },
    pickerHideFun() {
      this.$set(this.comPicker, 'pickerShow', false)
      this.$set(this.DatetimePicker, 'pickerShow', false)
    },

    // setAge(value) {
    //     this.$set(this.personInfoData, 'age', value.text);
    // },
    setReport(value) {
      this.$set(this.orderInfoData, 'report', value)
    },

    setReportAddr(value) {
      this.$set(this.orderInfoData, 'reportAddr', value)
    },

    setMarried(value) {
      this.$set(this.personInfoData, 'married', value)
    },
    // 把日期转化成2018-08-08的形式
    parseData(date) {
      var year = date.getFullYear()
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return year + '-' + month + '-' + day
    },

    // 检查表单内容是否都填写完毕
    checkoutInfo(type, isDefault) {
      switch (type) {
        case 'name':
          if (!this.checkoutEmpty(this.personInfoData, type, isDefault)) {
            this.$refs.personInfo.showError(type)
          }
          return
        case 'id_num':
          if (!this.checkoutEmpty(this.personInfoData, type, isDefault)) {
            this.$refs.personInfo.showError(type)
          }
          return
        case 'birthday':
          if (!this.checkoutEmpty(this.personInfoData, type, isDefault)) {
            this.$refs.personInfo.showError(type)
          }
          return
        case 'phone':
          if (!this.checkoutPhone(this.orderInfoData, type, isDefault)) {
            this.$refs.orderInfo.showError(type)
          }
          return
        case 'report':
          if (this.checkoutEmptyObj(this.orderInfoData, type, isDefault)) {
            this.$refs.orderInfo.showError(type)
          }
          return
        case 'married':
          this.checkoutEmptyObj(this.personInfoData, type, isDefault)
          return
        case 'reportAddr':
          this.checkoutEmptyObj(this.orderInfoData, type, isDefault)
          return
        default:
          for (var i = 0; i < this.checkoutType.length; i++) {
            this.checkoutInfo(this.checkoutType[i], isDefault)
          }
      }
    },

    checkoutInfoAll() {
      for (var i = 0; i < this.checkoutType.length; i++) {
        if (!this.error[this.checkoutType[i]]) {
          return false
        }
      }
      return true
    },

    checkoutEmpty(data, type, isDefault) {
      let error = this.deepClone(this.error)
      if (data[type]) {
        error[type] = true
      } else {
        error[type] = isDefault === 'default' ? null : false
      }
      this.error = error
      return this.error[type]
    },

    checkoutEmptyObj(data, type, isDefault) {
      let error = this.deepClone(this.error)
      if (data[type] && JSON.stringify(data[type]) !== '{}') {
        error[type] = true
      } else {
        error[type] = isDefault === 'default' ? null : false
      }
      this.error = error
      return this.error[type]
    },

    checkoutPhone(data, type, isDefault) {
      let error = this.deepClone(this.error)
      if (testPhone(data[type])) {
        error[type] = true
      } else {
        error[type] = isDefault === 'default' ? null : false
      }
      this.error = error
      return this.error[type]
    },
    hideError(type) {

    },

    deepClone(obj) {
      let _obj = JSON.stringify(obj)

      let objClone = JSON.parse(_obj)
      return objClone
    },

    submit(disable) {
      if (disable) {
        this.loading = true
        orderReserve({
          package_id: this.getSelectedPackageInfo.package_id,
          free_add_item_ids: this.getSelectedPackageInfo.free_add_item_ids,
          pay_add_item_ids: this.getSelectedPackageInfo.pay_add_item_ids,
          medical_date: this.getSelectedPackageInfo.medical_date,
          medical_time_start: '',
          medical_time_end: '',
          birthday: this.personInfoData.birthday,
          is_marry: this.personInfoData.married.value,
          mobile_phone: this.orderInfoData.phone,
          report_type: this.orderInfoData.report.value,
          office_address: this.orderInfoData.reportAddr.text,
          check_hepatitis_b: this.getSelectedPackageInfo.check_hepatitis_b,
          total_price: this.price
        }).then((res) => {
          if (res && res.code === 0) {
            this.$router.push({
              path: '/'
            })
          } else {
            var mag = (res && res.msg) || '提交订单失败'
            Toast(mag)
          }
          this.loading = false
        })
      } else {
        this.checkoutInfo()
      }
    }
  },
  computed: {
    ...mapGetters(['getSelectedPackageInfo'])
  },
  watch: {
    error(val) {
      if (this.checkoutInfoAll()) {
        this.submitDisable = false
      } else {
        this.submitDisable = true
      }
    }
  }
}
</script>
