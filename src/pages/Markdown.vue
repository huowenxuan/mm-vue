<template>
  <div>
    <mu-appbar :zDepth="2" title="Markdown" class="nav-bar">
      <mu-icon-button icon="arrow_back_ios" slot="left" @click="back()"/>
      <mu-icon-button icon="repeat" slot="right" @click="change()"/>
      <mu-icon-button icon="content_copy" slot="right"/>
    </mu-appbar>

    <div class="container-nav container">
      <div v-html="convertedHtml" v-show="isConverted"></div>
      <p v-show="!isConverted" class="originText">{{originText}}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import * as showdown from 'showdown'

  @Component
  export default class Markdown extends Vue {
    convertedHtml = '' // 转换后的英文
    originText = '' // 转换前的文字
    isConverted = false // 是否转换

    mounted() {
      this.originText = this.$route.params.markdown
      let converter = new showdown.Converter()
      this.convertedHtml = converter.makeHtml(this.originText);
      this.isConverted = true
    }

    change() {
      this.isConverted = !this.isConverted
    }

    back() {
      this.$router.back()
    }
  }
</script>

<style>
  .originText {
    white-space: pre-line;
  }

  .container {
    padding: 14px !important;
    padding-top: 78px !important;
  }
</style>
