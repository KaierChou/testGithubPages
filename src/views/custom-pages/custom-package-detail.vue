<template>
  <div v-show="!isLoading">
    <header>
      <h2>{{resData.name}}</h2>
      <p>{{resData.brief}}</p>
    </header>

    <section class="include">
      <div class="title">
        <span></span>
        <h3>包含项目</h3>
      </div>
      <div class="item-box">
        <section v-for="(item, index) in resData.cat_items" :key="index">
          <p class="item-name">{{item.cat_name}}</p>
          <div class="item" v-for="(sitem, sindex) in item.item_list" :key="sindex">
            <div>
              <p>{{sitem.item_name}}</p>
              <p>{{sitem.item_desc}}</p>
            </div>
            <span class="info-icon" @click.stop="viewDetail(sitem)"></span>
          </div>
        </section>
      </div>
    </section>

    <section class="attention" v-if="resData.remark && resData.remark.length>0">
      <div class="title">
        <span></span>
        <h3>注意事项</h3>
      </div>
      <ul>
        <li v-for="(item, index) in resData.remark" :key="index">{{index+1 +'、'+ item}}</li>
      </ul>
    </section>

    <div class="placeholder"></div>

    <div class="notice">受政策及医疗环境影响，不同机构套餐项目略有不同，具体项目以实际到店为准</div>

    <ComDialog :title="dialogTitle" :content='dialogContent' :showDialog='showDialog' @close='closeDialog' />
  </div>
</template>
<script>
import { getPackageDetail } from '../../assets/js/http/index.js'
import ComDialog from '../../components/common/dialog.vue'
export default {
  name: 'custom-package-detail',
  components: { ComDialog },
  data() {
    return {
      isLoading: true,
      resData: {
        cat_items: []
      },
      dialogTitle: '',
      dialogContent: '',
      showDialog: false
    }
  },
  methods: {
    viewDetail(data) {
      this.dialogTitle = data.item_name
      this.dialogContent = data.item_desc
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    getData() {
      let params = {
        packageId: 0
      }
      params.packageId = this.$route.params.id
      getPackageDetail(params).then(
        res => {
          if (res.code === 0) {
            this.resData = res.data
          } else {
            this.$toast.fail(res.message)
          }
          this.isLoading = false
          this.$comLoading.isLoading(true)
        },
        err => {
          this.$toast.fail(err.toString())
          this.$comLoading.isLoading(true)
        }
      )
    }
  },
  mounted() {
    this.getData()
  },
  created() {
    this.$comLoading.isLoading(true)
  }
}
</script>
<style scoped lang="less">
@import "../../assets/css/var.less";
header {
  width: 100%;
  height: 128px;
  background: @blue;
  color: @white;
  box-sizing: border-box;
  padding: 24px 26px 16px 16px;
  h2 {
    font-family: PingFangSC-Medium;
    line-height: 30px;
    font-size: 22px;
    margin-bottom: 14px;
  }
  p {
    font-family: PingFangSC-Regular;
    line-height: 20px;
    opacity: 0.79;
    font-size: 14px;
    color: #ffffff;
  }
}
.title {
  text-align: left;
  margin-bottom: 20px;
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
.include {
  background-color: @white;
  box-sizing: border-box;
  padding: 20px 16px 0px 16px;
  margin-bottom: 8px;
  overflow: hidden;
  position: relative;
  .item-box {
    .item-name {
      width: 100%;
      height: 34px;
      line-height: 34px;
      font-family: PingFangSC-Regular;
      background-color: #f8f8f8;
      text-align: center;
      font-size: 14px;
      color: #9b9b9b;
    }
    .item {
      box-sizing: border-box;
      padding: 20px 0;
      border-bottom: 0.5px solid #d9dcde;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div:first-child {
        flex: 1;
      }
      & > div:first-child > p:first-child {
        font-family: PingFangSC-Regular;
        line-height: 20px;
        font-size: 14px;
        color: #000000;
        margin-bottom: 6px;
      }
      & > div:first-child > p:last-child {
        width: 308px;
        font-family: PingFangSC-Regular;
        line-height: 17px;
        font-size: 12px;
        color: #9b9b9b;
        display: -webkit-box;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      & > .info-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 4px;
        border-radius: 100%;
        background: url("../../assets/images/ic_info.svg") no-repeat center;
        background-size: 14px 14px;
      }
    }
    .item:last-child {
      border-bottom: none;
    }
  }
}
.attention {
  background-color: @white;
  box-sizing: border-box;
  padding: 20px 16px;
  overflow: hidden;
  position: relative;
  & > .title {
    margin-bottom: 13px;
  }
  ul {
    box-sizing: border-box;
    padding: 0 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3d3d45;
    line-height: 24px;
  }
}
.placeholder {
  height: 44px;
}
.notice {
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px 12px;
  color: @white;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  line-height: 17px;
}
</style>
