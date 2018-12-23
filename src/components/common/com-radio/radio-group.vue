<template>
  <div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'com-radio-group',
  props: {
    value: null,
    disabled: Boolean
  },
  watch: {
    value(value) {
      this.$emit('change', value)
    }
  },
  mounted() {}
}
</script>
