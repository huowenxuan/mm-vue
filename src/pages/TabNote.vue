<template>
  <div>
    <mu-appbar :zDepth="2" title="Note" class="nav-bar">
      <mu-icon-button icon="menu" slot="left"/>
      <mu-flat-button label="expand_more" slot="right"/>
      <mu-icon-button icon="expand_more" slot="right"/>
    </mu-appbar>

    <mu-list  class="container-nav-tab">
      <mu-refresh-control :refreshing="refreshing" :trigger="scroll" @refresh="refresh"/>
      <div v-for="note in notes" :key="note.id">
        <mu-list-item :title="showTime(note)" @click="toMarkdown(note)">
          <div v-if="!showDate(note)" style="border-left:1px dashed black; left:35px; top:0; width: 1px; bottom: 2px; position: absolute"></div>

          <span style="color: black;" slot="leftAvatar">{{ showDate(note) }}</span>

          <span slot="describe">{{ note.attributes.text }}</span>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="编辑"/>
            <mu-menu-item title="删除"/>
          </mu-icon-menu>
        </mu-list-item>
        <mu-divider inset/>
      </div>
      <mu-infinite-scroll :scroller="scroll" :loading="loading" @load="loadMore" loadingText="load more..."/>
    </mu-list>
  </div>
</template>

<script lang="ts">
  import LCStorage from '../utils/LCStorage.ts'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import * as moment from 'moment';

  @Component
  export default class TabNote extends Vue {
    notes = []
    loading = false
    skip = 0
    limit = 10
    lc = new LCStorage()
    scroll = null
    refreshing = false

    picker: null

    async beforeMount() {
    }

    mounted() {
      this.scroll = this.$el
      this.refresh()
    }

    toMarkdown(note) {
      this.$router.push({name: 'markdown', params: {markdown: note.attributes.text}})
    }

    async loadMore() {
      this.skip += this.limit
      if (!this.loading) {
        this.loading = true
        let notes = await this.lc.getNotes('1', this.skip, this.limit)
        if (notes && notes.length > 0) {
          this.notes.push(...notes)
        }
        this.loading = false
      }
    }

    async refresh() {
      this.refreshing = true
      this.skip = 0
      this.notes = await this.lc.getNotes('1', this.skip, this.limit)
      this.refreshing = false
    }

    isThisYear(date) {
      return moment(date).year() === moment().year()
    }

    isSameDay(d1, d2) {
      if (!d1 || !d2) return false

      let m1 = moment(d1)
      let m2 = moment(d2)
      if (m1.year() != m2.year()) return false
      return m1.date() === m2.date() && m1.month() === m2.month()
    }

    getTime(createdAt) {
      if (!createdAt) return ''
      let m = moment(createdAt)
      let hour = m.hour()
      let min = m.minute()
      return `${hour}:${min}`
    }

    getDate(date) {
      if (!date) return ''
      let weekCns = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let m = moment(date)
      let year = m.year()
      let month = m.month() + 1
      let day = m.date()
      let weekday = m.weekday()

      let end = `${month}/${day}\n${weekCns[weekday]}`
      if (!this.isThisYear(date))
        end = `${end} ${year}`
      return end
    }

    showDate(note) {
      let shouldShow = true
      let index = this.notes.indexOf(note)
      if (index > -1) {
        let currentEnd = this.notes[index].attributes.end
        if (this.notes[index - 1]) {
          let lastEnd = this.notes[index - 1].attributes.end
          shouldShow = !this.isSameDay(currentEnd, lastEnd)
        }
      }

      if (!shouldShow) {
        return null
      }

      const {end} = note.attributes
      return this.getDate(end)
    }

    showTime(note) {
      const {start, end} = note.attributes
      let startTime = this.getTime(start)
      let endTime = this.getTime(end)

      let time = endTime
      if (startTime) {
        time = `${startTime}-${endTime}`
      }

      return time
    }
  }

</script>

<style>
  .load-more {
    text-align: center;
    margin: 20px auto;
  }

  .mu-item-left {
    max-height: 100px !important;
    /*align-items: flex-start !important;*/
    /*top: 13px !important;*/
  }

</style>
