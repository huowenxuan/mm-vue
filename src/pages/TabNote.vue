<template>
  <div>
    <v-list two-line>
      <template v-for="note in notes">
        <v-list-tile avatar ripple v-bind:key="index" @click="">

          <v-list-tile-content style="width: 25%">
            <v-list-tile-title>{{showTime(note.attributes.start, note.attributes.end)}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-content style="width: 75%">
            <v-list-tile-sub-title>{{ note.attributes.text }}</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>
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

    async beforeMount() {
      let lc = new LCStorage()
      this.notes = await lc.getNotes('1', 0, 10)
      console.log(this.notes)
    }

    toMarkdown() {
      this.$router.push({name: 'markdown'})
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
      if (this.isSameDay(date, Date.now())) return ''

      let weekCns = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let m = moment(date)
      let year = m.year()
      let month = m.month() + 1
      let day = m.date()
      let weekday = m.weekday()

      let end = `${month}/${day} ${weekCns[weekday]}`
      if (!this.isThisYear(date)) {
        end = `${year}/${end}`
      }
      return end + '  '
    }

    showTime(start, end) {
      let endDate = this.getDate(end)
      let startTime = this.getTime(start)
      let endTime = this.getTime(end)

      let time = endTime
      if (startTime) {
        time = `${startTime} - ${endTime}`
      }

      // return `${endDate}${time}`
      return '1111\n2222'
    }
  }

</script>

<style>
  h4 {
    font-size: large;
  }

  .pp {
    margin: 0;
    font-size: small;
    white-space: pre; /* 多行*/
    text-overflow: ellipsis; /*超出的宽度显示省略号*/
    overflow: hidden; /*不超出父元素*/
    -webkit-line-clamp: 5; /*限制最大行数*/
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
</style>
