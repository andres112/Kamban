<template>
  <div :class="`col-${colSize}`" class="q-mx-none">
    <q-toolbar class="bg-secondary text-white">
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
      />
    </q-toolbar>

    <q-page v-if="loading"><slot name="loading"></slot></q-page>
    <div class="row">
      <!-- Card components -->
      <card
        v-for="cardContent in colContent"
        :key="cardContent.id"
        :content="cardContent"
        class="full-width"
      ></card>
    </div>

    <!-- Create new task -->
    <task-form />
  </div>
</template>

<script>
import Card from "@/components/kamban/Card.vue";
import TaskForm from "@/components/kamban/TaskForm.vue";
import { provide, ref } from "vue";

export default {
  name: "Column",
  props: {
    colSize: { type: Number, default: 4 },
    colName: String,
    addBtn: Boolean,
    colContent: Array,
    loading: Boolean,
  },
  components: {
    Card,
    TaskForm,
  },
  setup() {
    const isVisible = ref(false);
    const setVisibility = (visibility) => {
      isVisible.value = visibility;
    };
    provide("taskFormVisible", { isVisible, setVisibility });

    return { isVisible, setVisibility };
  },
};
</script>

<style></style>
