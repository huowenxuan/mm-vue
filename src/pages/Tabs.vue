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

    <TabNote v-show="tab===0" class="container-nav-tab" v-if=""></TabNote>
    <TabChat v-show="tab===1" class="container-nav-tab"></TabChat>
    <TabMoney v-show="tab===2" class="container-nav-tab"></TabMoney>

    <v-bottom-nav
        class="tab-bar"
        absolute
        :value="showTab"
        :active.sync="tab"
        color="primary"
    >
      <v-btn dark>
        <span>Note</span>
        <v-icon>note</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Money</span>
        <v-icon>money</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
  import TabNote from "./TabNote";
  import TabChat from "./TabChat";
  import TabMoney from "./TabMoney";

  export default {
    components: {TabNote, TabChat, TabMoney},
    name: 'Tabs',
    data() {
      return {
        tab: 0,
        showTab: true
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
</style>

