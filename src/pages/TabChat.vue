<template>
  <h1>TabChat</h1>
</template>

<script>
  export default {
    name: 'TabChat',
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

