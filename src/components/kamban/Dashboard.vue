<template>
  <div>
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
  </div>
</template>

<script>
import Column from "@/components/kamban/Column.vue";
import { useDb } from "@/hooks/useDb";

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
    const { loading, getAllTasks } = useDb();
    console.log(loading);
    console.log(getAllTasks);
    //TODO: load the columns content
    return { COLUMNS };
  },
};
</script>

<style></style>
