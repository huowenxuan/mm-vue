<template>
  <h1>TabMoney</h1>
</template>

<script>
  export default {
    name: 'TabMoney',
    data() {
      return {}
    },
    methods: {
      toMarkdown() {
        this.$router.push({name: 'markdown'})
      }
    }
  }
</script>

