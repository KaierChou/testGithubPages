<template>
  <div class="page_">
    <div v-show="!loading">
      <reservationInfo :disabled="type" :data="reservationData"></reservationInfo>
      <person-info :data="personInfoData" :disabled="type"></person-info>
      <order-info :data="orderInfoData" :disabled="type"></order-info>
      <Package :result="packageData" :disabled="type"></Package>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/common/loading'
import Package from '@/components/form/package'
import orderInfo from '@/components/form/orderInfo'
import personInfo from '@/components/form/personInfo'
import reservationInfo from '@/components/form/reservationInfo'
import { orderDetail } from '@/assets/js/http/index'
import { reportType } from '@/assets/js/config'
export default {
  name: 'order-detail',
  components: {
    Package,
    orderInfo,
    personInfo,
    reservationInfo,
    Loading
  },
  data() {
    return {
      packageData: [],
      personInfoData: { married: {} },
      orderInfoData: { report: {}, reportAddr: {} },
      info: {},
      type: 1,
      loading: true,
      reservationData: {}
    }
  },
  created() {
    this.load()
  },

  methods: {
    load() {
      orderDetail({
        id: this.$route.query.order_id
      }).then((res) => {
        if (res.code === 0) {
          this.loading = false
          this.packageData = res.data.package_list
          this.reservationData = {
            org_name: res.data.org_name,
            medical_time: res.data.medical_time,
            address: res.data.address
          }
          this.personInfoData = {
            name: res.data.name,
            id_num: res.data.card_id,
            birthday: res.data.birthday,
            married: {
              text: res.data.marriage_status
            }
          }

          this.orderInfoData = {
            phone: res.data.phone,
            report: reportType[res.data.report_type - 1],
            reportAddr: {
              text: res.data.office_address
            }
          }
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
</style>
