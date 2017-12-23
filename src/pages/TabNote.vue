<template>
  <h1>TabNote</h1>
</template>

<script>
  import LCStorage from '../utils/LCStorage.ts'
  export default {
    name: 'TabNote',
    data() {
      return {}
    },
    beforeMount() {
      let lc = new LCStorage()
      lc.getNotes('1', 0, 1)
        .then((notes)=>{
          console.log(notes)
        })
    },
    methods: {
      toMarkdown() {
        this.$router.push({name: 'markdown'})
      }
    }
  }
</script>

