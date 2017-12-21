<template class="content">
  <div class="content">
    <div  class="bar bar-nav">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>search</v-icon>
      </v-btn>
      <v-btn icon><v-icon>apps</v-icon></v-btn>
      <v-btn icon><v-icon>refresh</v-icon></v-btn>
      <v-btn icon><v-icon>more_vert</v-icon></v-btn>
    </v-toolbar>
    </div>

    <h1>tabs</h1>
    <a @click="toMarkdown()">走</a>

    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
    <footer></footer>
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
        this.$router.push({name: 'tab-note'})
      }
    }
  }
</script>

<style>
  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .bar {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 10;
    height: 2.2rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    background-color: #f7f7f8;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;  }
  .bar-nav {
    top: 0;
  }

  footer {
    background-color: gray;
    height: 100px;
    padding: 10px;
    margin: 10px;
  }
</style>

