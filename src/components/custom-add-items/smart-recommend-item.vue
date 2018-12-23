<template>
  <div class="smart-recommend">
    <header class="recommend-title">
      <span></span>
      <h3>{{resData.intelligence_package.title}}</h3>
      <p>{{resData.intelligence_package.desc}}</p>
    </header>

    <section class="recommend-list">
      <div class="item">
        <p class="symptoms">慢性胃炎病史 | 幽门螺旋杆菌偏高 </p>
        <div class="item-info-box">
          <img src="https://image.ibb.co/eMidhq/images-3.jpg" />
          <div class="item-info">
            <p>消化道深度检查</p>
            <p>建议有消化不良症状，有胃溃疡病史，有胃癌家族…</p>
            <p>¥ 82 <span>起</span> </p>
            <p>支持医院：港大、市二、省儿童、空港、解放军医院、同仁堂中医院</p>
          </div>
          <div class="item-select">
            <AddorDel class="select" />
          </div>
        </div>
      </div>

      <div class="item">
        <p class="symptoms">慢性胃炎病史 | 幽门螺旋杆菌偏高</p>
        <div class="item-info-box">
          <img src="https://image.ibb.co/eMidhq/images-3.jpg" />
          <div class="item-info">
            <p>消化道深度检查</p>
            <p>建议有消化不良症状，有胃溃疡病史，有胃癌家族…</p>
            <p>¥ 82 <span>起</span> </p>
          </div>
          <div class="item-select">
            <AddorDel class="select" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AddorDel from '@/components/common/add-or-del.vue'
export default {
  name: 'other-add-item',
  props: ['resData'],
  components: {
    AddorDel
  }
}
</script>
<style lang="less" scoped>
.smart-recommend {
  overflow: auto;
  padding-bottom: 25px;
  .recommend-title {
    padding: 20px 16px 0 16px;
    text-align: left;
    background-color: #fff;
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
      padding-bottom: 4px;
    }
  }
  .recommend-list {
    padding: 8px 16px 0 16px;
    .item {
      box-shadow: 0px 5px 15px 0 rgba(232, 232, 232, 0.5);
      border-radius: 6px;
      background-color: #fff;
      margin-bottom: 12px;
      .symptoms {
        box-sizing: border-box;
        width: 100%;
        height: 36px;
        color: #32cbe4;
        line-height: 36px;
        font-size: 14px;
        padding-left: 12px;
        background-color: #f1fcfe;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-info-box {
        box-sizing: border-box;
        padding: 16px 14px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        img {
          width: 84px;
          height: 84px;
          margin-right: 12px;
        }
        .item-info {
          width: 200px;
          overflow: hidden;
          p:nth-child(1) {
            font-size: 14px;
            line-height: 20px;
            margin: 3px 0 5px 0;
          }
          p:nth-child(2) {
            width: 200px;
            font-size: 12px;
            color: #9b9b9b;
            margin-bottom: 6px;
            line-height: 17px;
            display: -webkit-box;
            /* autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
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
            font-size: 12px;
            color: #32cbe4;
          }
        }
        .item-select {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          .select {
            margin-top: 33px;
          }
        }
      }
    }
    .item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
