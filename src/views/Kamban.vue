<template>
  <q-page class="q-px-none">
    <h5 class="q-ma-md">Dashboard</h5>
    <div class="row full-width q-col-gutter-xs">
      <column
        v-for="c in COLUMNS"
        :key="c.colName"
        :colSize="c.colSize"
        :colName="c.colName"
        :addBtn="c.addBtn"
      ></column>
    </div>
  </q-page>
</template>

<script>
import Column from "@/components/kamban/Column.vue";
const COLUMNS = [
  { colSize: 4, col_id: "todo", colName: "ToDo", addBtn: true },
  { colSize: 5, col_id: "prog", colName: "Progress" },
  { colSize: 3, col_id: "done", colName: "Done" },
];
export default {
  name: "Dashboard",
  components: {
    Column,
  },
  setup() {

      //TODO: load the columns content
    return { COLUMNS };
  },
};
</script>

<style></style>
