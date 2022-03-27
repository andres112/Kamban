<template>
  <div>
    <h5 class="q-ma-md q-py-sm">Dashboard</h5>
    <div class="row full-width q-col-gutter-xs justify-center">
      <column
        v-for="c in columns"
        :key="c.state"
        :colType="c.state"
        :colSize="c.colSize"
        :colName="c.colName"
        :colColor="c.colColor"
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-tooltip>{{
        pauseVisible ? "Hide Paused Tasks" : "See Paused Tasks"
      }}</q-tooltip>
      <q-btn
        fab
        :icon="pauseVisible ? 'visibility_off' : 'visibility'"
        color="indigo"
        @click="pauseVisible = !pauseVisible"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import Column from "@/components/kamban/Column.vue";
import { useDb } from "@/hooks/useDb";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

const COLUMNS = [
  {
    colSize: 3,
    state: "todo",
    colName: "ToDo",
    addBtn: true,
    colColor: "deep-orange-9",
  },
  { colSize: 3, state: "progress", colName: "Progress" },
  { colSize: 3, state: "done", colName: "Done" },
  { colSize: 3, state: "pause", colName: "Paused", colColor: "grey" },
];
export default {
  name: "Dashboard",
  components: {
    Column,
  },
  setup() {
    const store = useStore();
    const { loading, getAllTasks } = useDb();

    const pauseVisible = ref(false);

    onMounted(async () => {
      await getAllTasks();
    });

    const listOfTasks = (col_id) => {
      return store.state.tasks[col_id + "List"];
    };

    const columns = computed(() => {
      return pauseVisible.value
        ? COLUMNS.map((x) => {
            x.colSize = 3;
            return x;
          })
        : COLUMNS.slice(0, 3).map((x) => {
            x.colSize = 4;
            return x;
          });
    });

    return { columns, loading, listOfTasks, pauseVisible };
  },
};
</script>

<style></style>
