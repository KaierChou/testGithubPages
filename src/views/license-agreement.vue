<template>
  <div id="LicenseAgreement">
    <div class="title">用户知情确认及授权书</div>
    <div class="ctn">授权人：当前提交人
      <br>本人自愿向 腾讯行政部门 （下称“被授权人”） 提供个人的体检报告等本人在页面提交的报告材料及相关信息用于进行个人健康管理、使用被授权人提供的报告解读等相关产品，并同意被授权人有权向提供报告解读、咨询服务的医生和/或医疗机构提供本人提交的上述报告材料及相关信息。同时，本人同意并遵守被授权人公布的隐私权政策所列的全部内容。本人已经充分知晓自己的权利并了解和愿意承担本次授权可能带来的所有风险和对本人利益可能的损害，并郑重声明本次授权系本人自己所为且为本人自愿。本人已完整阅读并充分理解授权书含义，本人自愿选择同意授权。
    </div>
  </div>
</template>

<script>
export default {
  name: 'LicenseAgreement',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
#LicenseAgreement {
  width: 100%;
  height: auto;
  .title {
    font-size: 18px;
    line-height: 24px;
    color: #3d3d45;
    text-align: center;
    padding: 18px 0;
    margin: 0 20px;
    border-bottom: #c6d2d4 2px dashed;
  }
  .ctn {
    font-size: 16px;
    line-height: 28px;
    color: #50505f;
    padding: 16px 20px;
  }
}
</style>
