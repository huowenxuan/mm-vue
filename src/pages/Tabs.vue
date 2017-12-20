<template>
    <div>
        <v-toolbar dark color="secondary" extended>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title class="white--text" slot="extension">Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>

        <h1>tabs</h1>
        <a @click="toMarkdown()">走</a>
    </div>
</template>

<script>
  export default {
    name: 'Tabs',
    data() {
      return {}
    },
    methods: {
      toMarkdown() {
      this.$router.push({name: 'markdown'})
      }
    }
  }
</script>

