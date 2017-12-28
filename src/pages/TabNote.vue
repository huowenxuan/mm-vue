<template>
  <div  v-scroll="loadMore">
    <!--<h1>Note</h1>-->
    <mu-appbar :zDepth="2" title="Note" class="nav-bar">
      <mu-icon-button icon="menu" slot="left"/>
      <mu-flat-button label="expand_more" slot="right"/>
      <mu-icon-button icon="expand_more" slot="right"/>
    </mu-appbar>

    <div class="container-nav-tab" >
      <!--<mu-refresh-control :refreshing="refreshing" :trigger="scroll" @refresh="refresh"/>-->
      <div v-for="note in notes" :key="note.id">
        <div class="note-row">
          <mu-icon-menu class="note-menu" icon="more_vert">
            <mu-menu-item title="编辑"/>
            <mu-menu-item title="删除"/>
          </mu-icon-menu>
          <span class="date">{{showDate(note)}}</span>
          <div style="padding-right: 25px;">
            <span class="time">{{showTime(note)}}</span>
            <span class="pp">{{ note.attributes.text }}</span>
          </div>
        </div>
        <!--<mu-list-item :title="showTime(note)" :disableRipple="true" @click="toMarkdown(note)">-->
        <!--<div v-if="!showDate(note)" style="border-left:1px dashed black; left:35px; top:0; width: 1px; bottom: 2px; position: absolute"></div>-->

        <!--<span style="color: black;" slot="leftAvatar">{{ showDate(note) }}</span>-->

        <!--<span slot="describe">{{ note.attributes.text }}</span>-->
        <!--<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">-->
        <!--<mu-menu-item title="编辑"/>-->
        <!--<mu-menu-item title="删除"/>-->
        <!--</mu-icon-menu>-->
        <!--</mu-list-item>-->
        <!--<mu-divider inset/>-->
      </div>

      <h2 class="load-more">{{loadMoreText}}</h2>
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
            // fn()
          }
        },
        bind: (el, binding) => {
          window.addEventListener('scroll', () => {
            let top = document.body.scrollTop
            let windowHeight = window.innerHeight
            let clientHeight = el.clientHeight
            let fn = binding.value;
            console.log(top, clientHeight, windowHeight)
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
    scroll = null
    refreshing = false
    loadMoreText = 'load more...'

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
        console.log('loading')
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
    /*text-align: center;*/
    /*margin: 20px auto;*/
  }

  .mu-item-left {
    max-height: 100px !important;
  }

  .note-row {
    margin-bottom: 10px;
  }

  .date {
    width: 65px;
    float: left !important;
    white-space: pre-line;
    min-height: 30px;
    font-size: 16px;
    color: black;
    font-weight: bold;
  }

  .time {
    font-size: 15px;
    color: #4a4a4a;
    font-weight: bold;
  }

  .note-menu {
    position: absolute !important;
    right: 0 !important;
  }

  .note-menu .mu-icon-button {
    padding-top: 0 !important;
  }

  .pp {
    margin-top: 5px;
    font-size: small;
    /*white-space: pre; !* 多行*!*/
    text-overflow: ellipsis; /*超出的宽度显示省略号*/
    overflow: hidden; /*不超出父元素*/
    -webkit-line-clamp: 3; /*限制最大行数*/
    -webkit-box-orient: vertical;
    display: -webkit-box;
    color: slategray;
  }


</style>
