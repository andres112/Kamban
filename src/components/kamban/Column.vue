<template>
  <div :class="`col-${colSize}`" class="q-mx-none">
    <q-toolbar class="bg-green text-white">
      <q-toolbar-title>
        <span class="text-bold">{{ colName }}</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="add_box" v-if="addBtn" />
    </q-toolbar>
    <!-- Card components -->
    <!-- TODO: replace with the real data -->
    <card :content="{ name: 'Aja' }"></card>
    <card :content="{ name: 'new' }"></card>
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
