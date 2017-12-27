<template>
  <div>
    <v-toolbar class="nav-bar" dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>search</v-icon>
      </v-btn>
      <v-btn icon><v-icon>apps</v-icon></v-btn>
      <v-btn icon><v-icon>refresh</v-icon></v-btn>
      <v-btn icon><v-icon>more_vert</v-icon></v-btn>
    </v-toolbar>

    <TabNote v-show="tab==='e1'" class="container-nav-tab"></TabNote>
    <TabChat v-show="tab==='e2'" class="container-nav-tab"></TabChat>
    <TabMoney v-show="tab==='e3'" class="container-nav-tab"></TabMoney>

    <v-bottom-nav
        absolute
        class="tab-bar"
        :value="showTab"
        :active="tab"
        color="primary"
    >
      <v-btn color="white" dark value="e1" @click="changeTab('e1')">
        <span>Note</span>
        <v-icon>note</v-icon>
      </v-btn>
      <v-btn color="white" dark value="e2" @click="changeTab('e2')">
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>
      <v-btn color="white" dark value="e3" @click="changeTab('e3')">
        <span>Money</span>
        <v-icon>money</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import TabNote from "./TabNote.vue";
  import TabChat from "./TabChat.vue";
  import TabMoney from "./TabMoney.vue";
  import Component from 'vue-class-component'

  @Component({
    components: {TabNote, TabChat, TabMoney}
  })
  export default class Tabs extends Vue {
    tab = 'e1'
    showTab = true

    changeTab(e) {
      this.tab = e
    }
  }
</script>

<style>
</style>

