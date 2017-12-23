<template>
  <!-- v-app能使color='primary'生效，并且支持自定义主题 -->
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'

    export default {
        name: 'app'
    } as ComponentOptions<Vue>
</script>
