<template>
    <div>
        <h1>tabs</h1>
        <a @click="toMarkdown()">走</a>
    </div>
</template>

<script>
  export default {
    name: 'Tabs',
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

