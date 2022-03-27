<template>
  <div :class="`col-${colSize}`" class="q-mx-none" :key="colType">
    <q-toolbar
      class="bg-secondary text-white"
      :class="'bg-' + colColor ?? 'bg-secondary'"
    >
      <q-toolbar-title>
        <span class="text-bold">{{ colName }}</span>
      </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        icon="add_box"
        v-if="addBtn"
        @click="setVisibility(true)"
      >
        <q-tooltip> Create new task</q-tooltip>
      </q-btn>
    </q-toolbar>

    <q-page v-if="loading"><slot name="loading"></slot></q-page>

    <div
      class="row relative-position"
      v-else-if="emptyColumn && colType === 'todo'"
    >
      <q-card flat class="q-pa-lg absolute">
        <img src="@/assets/images/nothingtodo.svg" class="opacity-50 q-mb-sm" />
        <q-card-section class="q-pt-none">
          <p class="text-center text-h6 text-bold text-grey">No tasks ToDo</p>
        </q-card-section>
      </q-card>
    </div>
    <!-- Draggable elements -->
    <draggable
      :list="colContent"
      group="tasks"
      itemKey="id"
      @start="dragging = true"
      @end="dragging = false"
      @change="setCardPosition"
      class="full-height"
    >
      <!-- Card components -->
      <template #item="{ element }">
        <card :content="element" :key="element.id"></card>
      </template>
    </draggable>

    <!-- Create new task form -->
    <task-form />

    <!-- TODO: column for Paused tasks -->
  </div>
</template>

<script>
import Card from "@/components/kamban/Card.vue";
import TaskForm from "@/components/kamban/TaskForm.vue";
import { provide, ref, computed } from "vue";
import { useDb } from "@/hooks/useDb";
import draggable from "vuedraggable";

export default {
  name: "Column",
  props: {
    colSize: { type: Number, default: 4 },
    colName: String,
    colColor: String,
    addBtn: Boolean,
    colContent: Array,
    loading: Boolean,
    colType: String,
  },
  components: {
    Card,
    TaskForm,
    draggable,
  },
  setup(props) {
    const { updateTask } = useDb();
    const isVisible = ref(false);
    const setVisibility = (visibility) => {
      isVisible.value = visibility;
    };
    provide("taskFormVisible", { isVisible, setVisibility });

    const setCardPosition = (el) => {
      console.log(el);
      if ("added" in el) {
        updateTask(el?.added?.element.id, {
          state: props.colType,
        });
      }
    };

    const emptyColumn = computed(() => {
      return props.colContent.length === 0;
    });

    return { isVisible, setVisibility, setCardPosition, emptyColumn };
  },
};
</script>

<style></style>
