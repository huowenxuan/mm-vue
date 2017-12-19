<template>
  <div>
    <h1>Markdown</h1>
    <a @click="back()">回</a>
  </div>
</template>

<script>
export default {
  name: 'markdown',
  data () {
    return {
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

