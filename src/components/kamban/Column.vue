<template>
  <div :class="`col-${colSize}`" class="q-mx-none">
    <q-toolbar class="bg-secondary text-white">
      <q-toolbar-title>
        <span class="text-bold">{{ colName }}</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="add_box" v-if="addBtn" />
    </q-toolbar>

    <q-page v-if="loading"><slot name="loading"></slot></q-page>

    <!-- Card components -->
    <card
      v-for="cardContent in colContent"
      :key="cardContent.id"
      :content="cardContent"
    ></card>
  </div>
</template>

<script>
import Card from "@/components/kamban/Card.vue";

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
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
