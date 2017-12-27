<template>
  <div>
    <TabNote v-show="tab==='note'"></TabNote>
    <TabChat v-show="tab==='chat'" ></TabChat>
    <TabMoney v-show="tab==='money'"></TabMoney>

    <mu-tabs class='tab-bar' :value="tab" @change="changeTab">
      <mu-tab value="note" icon="note"/>
      <mu-tab value="chat" icon="chat"/>
      <mu-tab value="money" icon="money"/>
    </mu-tabs>
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
    tab = 'note'
    showTab = true

    changeTab(e) {
      this.tab = e
    }
  }
</script>

<style>
</style>

