<template>
  <div>
    <h5 class="q-ma-md q-py-sm">Dashboard</h5>
    <div class="row full-width q-col-gutter-xs">
      <column
        v-for="c in COLUMNS"
        :key="c.colName"
        :colSize="c.colSize"
        :colName="c.colName"
        :addBtn="c.addBtn"
        :colContent="listOfTasks(c.state)"
        :loading="loading"
      >
        <template #loading>
          <q-inner-loading :showing="loading" label="Please wait...">
          </q-inner-loading>
        </template>
      </column>
    </div>
  </div>
</template>

<script>
import Column from "@/components/kamban/Column.vue";
import { useDb } from "@/hooks/useDb";
import { onMounted } from "vue";
import { useStore } from "vuex";

const COLUMNS = [
  { colSize: 4, state: "todo", colName: "ToDo", addBtn: true },
  { colSize: 5, state: "progress", colName: "Progress" },
  { colSize: 3, state: "done", colName: "Done" },
];
export default {
  name: "Dashboard",
  components: {
    Column,
  },
  setup() {
    const store = useStore();
    const { loading, getAllTasks } = useDb();

    onMounted(async () => {
      await getAllTasks();
    });

    const listOfTasks = (col_id) => {
      return store.state.tasks[col_id + "List"];
    };

    return { COLUMNS, loading, listOfTasks };
  },
};
</script>

<style></style>
