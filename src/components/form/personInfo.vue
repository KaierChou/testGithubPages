<template>
  <section class="page">
    <h3>
      <span>体检人信息</span>
    </h3>
    <ul class="item-form">
      <li ref="name">
        <span :class="{ 'gray' : data.nameDefault || disabled === 1 }">姓名</span>
        <div>
          <input
            type="text"
            :class="{'red' : error.name === false}"
            placeholder="请输入姓名"
            v-model="data.name"
            :disabled="data.nameDefault || disabled === 1"
            @focus="hideError('name')"
            @blur="checkoutInfo('name')"
          >
          <i class="clear"></i>
        </div>
      </li>
      <li ref="id_num">
        <span :class="{ 'gray' : data.id_numDefault || disabled === 1 }">证件号码</span>
        <div>
          <input
            type="text"
            :class="{'red' : error.id_num === false}"
            placeholder="请输入证件号码"
            v-model="data.id_num"
            :disabled="data.id_numDefault"
            @focus="hideError('id_num')"
            @blur="checkoutInfo('id_num')"
          >
          <i class="clear"></i>
        </div>
      </li>
      <li ref="birthday">
        <span :class="{ 'gray' : data.birthdayDefault || disabled === 1 }">出生日期</span>
        <div class="select" @click="selectBirthday">
          <span
            :class="{ 'gray' : !data.birthday, 'red' : error.birthday === false}"
          >{{ data.birthday ? data.birthday : '请选择出生日期'}}</span>
          <i class="arrow" v-if="!data.birthdayDefault && disabled !== 1"></i>
        </div>
      </li>
      <!-- <li>
                <span :class="{ 'gray' : data.ageDefault }">年龄</span>
                <div class="select" @click="selectAge">
                    <span :class="{ 'gray' : !data.age}">{{ data.age ? data.age : '请选择年龄'}}</span>
                    <i class="arrow" v-if="!data.ageDefault"></i>
                </div>
      </li>-->
      <li ref="married">
        <span :class="{ 'gray' : disabled === 1 }">婚否</span>
        <div class="select" @click="selectMarried">
          <span
            :class="{ 'gray' : !data.married.text, 'red' : error.married === false}"
          >{{ data.married.text ? data.married.text : '请选择婚否'}}</span>
          <i class="arrow" v-if="disabled !== 1"></i>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
@import "../../assets/css/var";
@imageUrl: "../../assets/images/apply/";
.page {
  background-color: #fff;
  .gray {
    color: @gray;
  }
  .red {
    color: @red;
  }
  h3 {
    font-size: 14px;
    color: #32cbe4;
    letter-spacing: 0;
    height: 34px;
    background-color: #e6fbfe;
    line-height: 34px;
    padding: 0 16px;
  }
  .item-form {
    font-size: 14px;
    color: #3d3d45;
    padding: 10px 16px;
    li {
      display: flex;
      justify-content: space-between;
      height: 30px;
      align-items: center;
      input {
        border: none;
        background-color: transparent;
        text-align: right;
      }
      .select {
        display: flex;
        align-items: center;
        .arrow {
          background-image: url("@{imageUrl}btn_arrow_next.svg");
          background-size: cover;
          width: 8px;
          height: 14px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
<script>
import { marriedArr } from '@/assets/js/config'
export default {
  name: 'personInfo',
  props: {
    data: {
      default: function() {
        return {
          married: {}
        }
      }
    },
    staff: {
      default: 1
    },
    error: {
      default: function() {
        return {}
      }
    },
    disabled: {
      default: 0
    }
  },
  data() {
    return {
      marriedOption: marriedArr,
      age: []
    }
  },

  created() {
    for (var i = 13; i < 100; i++) {
      this.age.push({
        text: i
      })
    }
  },

  methods: {
    selectMarried() {
      this.$emit('selectMarried', this.marriedOption)
    },
    selectBirthday() {
      if (this.data['birthdayDefault']) {
        return
      }
      this.$emit('selectBirthday')
    },
    checkoutInfo(type) {
      this.$emit('checkoutInfo', type)
    },
    hideError(type) {
      this.$emit('hideError', type)
    },
    showError(type) {
      if (this.$refs[type]) {
        this.$nextTick(() => {
          let top = Math.floor(this.$refs[type].getBoundingClientRect().y)
          let doc
          if (document.body) {
            doc = document.body
          }
          if (document.documentElement) {
            doc = document.documentElement
          }
          doc.scrollTop = top
        })
      }
    }
    //   selectAge() {
    //       if( this.data['ageDefault'] ) {
    //           return;
    //       }
    //       this.$emit('selectAge', this.age);
    //   }
  }

//   watch: {
//       error(val){
//         console.log(val)
//       }
//   }
}
</script>
