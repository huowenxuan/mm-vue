<template>
  <div v-scroll="loadMore">
    <div v-for="note in notes">
      <div class="time-box">
        <h3>{{showDate(note)}}</h3>
        <h4>{{showTime(note)}}</h4>
      </div>

      <div class="content-box">
        <p class="pp">{{ note.attributes.text }}</p>
      </div>
    </div>
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
            fn()
          }
        },
        bind: (el, binding) => {
          let top = document.body.scrollTop
          let windowHeight = window.innerHeight
          let clientHeight = el.clientHeight
          let fn = binding.value;
          window.addEventListener('scroll', () => {
            if (top + windowHeight >= clientHeight) {
              fn();
            }
          })
        }
      }
    }
  })
  export default class TabNote extends Vue {
    notes = []

    async beforeMount() {
      let lc = new LCStorage()
      this.notes = await lc.getNotes('1', 0, 1)
    }

    mounted() {
    }

    toMarkdown() {
      this.$router.push({name: 'markdown'})
    }

    loadMore() {
      console.log('s')
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

      let end = `${month}/${day} ${weekCns[weekday].replace('周', '')}`
      if (!this.isThisYear(date)) {
        end = `${year}/${end}`
      }
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
  .time-box {
    float: left;
    width: 110px;
  }

  .content-box {
    min-height: 60px;
    width: 100%;
  }

  .pp {
    margin: 0;
    font-size: small;
    /*white-space: pre; !* 多行*!*/
    text-overflow: ellipsis; /*超出的宽度显示省略号*/
    overflow: hidden; /*不超出父元素*/
    -webkit-line-clamp: 5; /*限制最大行数*/
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

</style>
