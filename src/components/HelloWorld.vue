<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="white" flat>
          <v-btn icon light>
            <v-icon color="grey darken-2">arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="grey--text text--darken-4">Albums</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon light>
            <v-icon color="grey darken-2">search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-subheader>May</v-subheader>
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="i in 6" :key="i">
              <img
                  class="image"
                  v-bind:src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
                  alt="lorem"
                  width="100%"
                  height="100%"
              >
            </v-flex>
          </v-layout>
        </v-container>
        <v-subheader>June</v-subheader>
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="i in 6" :key="i">
              <img class="image" v-bind:src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
        <v-footer class="mt-5"></v-footer>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      text: 'center',
      icon: 'justify',
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
