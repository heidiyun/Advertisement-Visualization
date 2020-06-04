<template>
  <div>
    <v-layout style="flex-wrap:wrap">
      <v-flex style="border:1px solid; height:400px;" md6>
        <scatter-plot></scatter-plot>
      </v-flex>
      <v-flex style="border:1px solid; height:400px;" md6>
        <line-graph></line-graph>
      </v-flex>
      <v-flex style="border:1px solid; height:400px;" md6>
        <table></table>
      </v-flex>
      <v-flex style="border:1px solid; height:400px;" md6></v-flex>
    </v-layout>
    <router-view></router-view>
  </div>
</template>

<script src="./app.ts"></script>

<style lang="scss">
@import "./app.scss";
</style>
