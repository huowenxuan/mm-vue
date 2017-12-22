<template>
  <!-- v-app能使color='primary'生效，并且支持自定义主题 -->
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
