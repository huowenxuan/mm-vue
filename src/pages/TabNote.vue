<template>
  <div>
    <mu-appbar title="Note" class="nav-bar">
      <mu-icon-button icon="menu" slot="left"/>
      <mu-flat-button label="expand_more" slot="right"/>
      <mu-icon-button icon="expand_more" slot="right"/>
    </mu-appbar>

    <!--v-scroll="loadMore"-->
    <mu-list class="container-nav-tab">
      <div v-for="note in notes" :key="note.id">
        <mu-sub-header v-if="showDate(note)" style="color: black; font-size: 18px; margin-top: 10px">{{showDate(note)}}</mu-sub-header>
        <mu-list-item :title="showTime(note)">
          <!--<span style="font-size: 30px; color: black; flex: 1; text-align: center" slot="leftAvatar">{{ note.attributes.text[0] }}</span>-->
          <span slot="describe">{{ note.attributes.text }}</span>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="编辑"/>
            <mu-menu-item title="删除"/>
          </mu-icon-menu>

        </mu-list-item>
        <!--<mu-divider inset/>-->
        <mu-divider />
      </div>

      <h2 class="load-more">{{loadMoreText}}</h2>
    </mu-list>
  </div>
</template>

<script lang="ts">
  import LCStorage from '../utils/LCStorage.ts'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import * as moment from 'moment';

  @Component({
    directives: {
      scroll: {
        componentUpdated: (el, binding) => {
          let top = document.body.scrollTop
          let windowHeight = window.innerHeight
          let clientHeight = el.clientHeight
          let fn = binding.value;
          if (clientHeight < window.innerHeight) {
            // fn()
          }
        },
        bind: (el, binding) => {
          window.addEventListener('scroll', () => {
            let top = document.body.scrollTop
            let windowHeight = window.innerHeight
            let clientHeight = el.clientHeight
            let fn = binding.value;
            if ((top + windowHeight) >= clientHeight) {
              fn();
            }
          })
        }
      }
    }
  })
  export default class TabNote extends Vue {
    notes = []
    loading = false
    skip = 0
    limit = 10
    lc = new LCStorage()
    loadMoreText = 'load more...'

    picker: null

    async beforeMount() {
      this.notes = await this.lc.getNotes('1', this.skip, this.limit)
    }

    mounted() {
    }

    toMarkdown() {
      this.$router.push({name: 'markdown'})
    }

    async loadMore() {
      this.skip += this.limit
      if (!this.loading) {
        this.loading = true
        let notes = await this.lc.getNotes('1', this.skip, this.limit)
        if (notes && notes.length > 0) {
          this.notes.push(...notes)
        } else {
          this.loadMoreText = 'no more'
        }
        this.loading = false
      }
    }

    refresh() {

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

      let end = `${month}/${day} ${weekCns[weekday]}`
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

</style>
