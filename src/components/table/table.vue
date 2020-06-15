<template>
  <div class="table-container">
    <a-table
      class="adset-table"
      :columns="columns"
      :data-source="filteredData"
      :scroll="{ x: 1500, y: 346 }"
      row-key="name"
      :pagination="false"
    />
  </div>
</template>

<script src="./table.ts"></script>

<style lang="scss">
@import "./table.scss";
</style>
