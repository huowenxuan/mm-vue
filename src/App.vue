<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue, {ComponentOptions} from 'vue'

  export default {
    name: 'app'
  } as ComponentOptions<Vue>
</script>
