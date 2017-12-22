<template>
  <div>
    <v-toolbar class="nav-bar" absolute  dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>search</v-icon>
      </v-btn>
      <v-btn icon><v-icon>apps</v-icon></v-btn>
      <v-btn icon><v-icon>refresh</v-icon></v-btn>
      <v-btn icon><v-icon>more_vert</v-icon></v-btn>
    </v-toolbar>

    <!--<TabNote class="container-nav-tab" v-if=""/>-->
    <!--<TabChat class="container-nav-tab"/>-->
    <div class="headline text-xs-center pa-5">Active: {{ e1 }}</div>

    <v-bottom-nav
        shift
        class="tab-bar"
        absolute
        :value="true" :active.sync="e1" color="transparent">
      <v-btn flat color="teal" value="recent">
        <span>Note</span>
        <v-icon>note</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="favorites">
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby">
        <span>Money</span>
        <v-icon>money</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
  import TabNote from "./TabNote";
  import TabChat from "./TabChat";

  export default {
    components: {TabNote, TabChat},
    name: 'Tabs',
    data() {
      return {
        e1: 'recent',
        value: true
      }
    },
    methods: {
      toMarkdown() {
        alert('s')
        // this.$router.push({name: 'tab-note'})
      }
    }
  }
</script>

<style>
  .item {
    background-color: gray;
    height: 100px;
    width: 100%;
    padding: 10px 0px;
    margin: 10px 0px;
  }
</style>

