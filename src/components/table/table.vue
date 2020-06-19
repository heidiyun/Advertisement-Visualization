<template>
  <div class="table-container">
    <div class="table-wrapper">
      <a-table
        class="adset-table"
        :columns="columns"
        :data-source="filteredData"
        :scroll="{ x: 1500, y: 286 }"
        row-key="name"
        :pagination="false"
      />
    </div>
  </div>
</template>

<script src="./table.ts"></script>

<style lang="scss">
@import "./table.scss";
</style>
