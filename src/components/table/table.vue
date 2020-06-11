<template>
  <div class="table-container">
    <a-table
      class="adset-table"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1300 }"
      rowKey="name"
      :pagination="false"
    >
      <!-- <a slotScope="text" href="javascript:;">action</a> -->
    </a-table>
  </div>
</template>

<script src="./table.ts"></script>

<style lang="scss">
@import "./table.scss";
</style>
