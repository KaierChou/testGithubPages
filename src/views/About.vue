<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box"></div>
    <br/>
    <br/>
    <button @click='changeGroupRadio'>changeGroupRadio</button>
    <br/>
    <br/>
    <ComRadioGroup v-model="radio" @change="groupRadioChange">
      <ComRadio name="1">单选框1</ComRadio>
      <ComRadio name="2">单选框2</ComRadio>
    </ComRadioGroup>
    <br/>
    <br/>

    <ComCheckBox @click="checkbox" :checked="checked" :value="'233'"></ComCheckBox>
    <br/>
    <br/>
    <br/>
    <button @click="handleShowDialog">showDialog</button>
    <ComDialog
      :showDialog='showDialog'
      :title='title'
      :content='content'
      :type='type'
      @close='handleShowDialog'
      @del='handleDel'
    />
    <MyModel></MyModel>
  </div>
</template>
<script>
import { RadioGroup, Radio } from 'vant'
import ComRadio from '../components/common/com-radio/radio.vue'
import ComRadioGroup from '../components/common/com-radio/radio-group.vue'
import ComCheckBox from '../components/common/com-checkbox/checkbox.vue'
import ComDialog from '../components/common/dialog.vue'
export default {
  name: 'about',
  components: {
    /*eslint-disable */
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    ComRadio,
    ComRadioGroup,
    ComCheckBox,
    ComDialog
  },
  data() {
    return {
      checked: true,
      radio: '1',
      value: 1,
      showDialog: false,
      title: '肿瘤检查',
      content: '是否删除体检人',
      type: 'delType'

    }
  },
  methods: {
    change() {
      this.value = ++this.value
    },
    input(val) {
      // console.log('外部 val')
      // console.log(val)
    },
    changeGroupRadio() {
      this.radio = (this.radio === '1' ? '2' : '1')
    },
    groupRadioChange(val) {
      // console.log('外部groupradio')
      // console.log(val)
      // console.log(this.radio)
    },
    checkbox(val) {
      console.log(val)
      this.checked = !this.checked
    },
    handleShowDialog() {
      this.showDialog = !this.showDialog
    },
    handleDel() {
      console.log('删除')
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 50px;
  height: 50px;
  background-color: skyblue;
}
</style>
