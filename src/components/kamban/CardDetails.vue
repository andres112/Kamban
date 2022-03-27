<template>
  <q-card class="q-ma-xs cardTask">
    <q-card-section horizontal class="justify-between">
      <!-- content section -->
      <!-- TODO: include fields validation -->
      <q-card-section class="full-width">
        <div class="text-h6">{{ cardContent.name }}</div>
        <div class="text-caption q-pb-md">
          {{ getDate(cardContent.date.seconds) }}
        </div>
        <q-separator :color="stateColor(cardContent.state)" />
        <div class="text-body2 q-pt-md text-description">
          {{ cardContent.text }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";

const STATE_OPTIONS = [
  { value: "todo", name: "ToDo", color: "deep-orange-9" },
  { value: "progress", name: "Progress", color: "green" },
  { value: "done", name: "Done", color: "blue" },
  { value: "pause", name: "Paused" },
];

export default {
  name: "CardDetails",
  setup() {
    const store = useStore();

    const cardContent = computed(() => store.state.tasks.currentTask);

    const getDate = (rawDate) => {
      const date = moment(rawDate * 1000);
      return date.format("MMM Do YYYY, h:mm");
    };

    const stateColor = (state) => {
      return STATE_OPTIONS.find((x) => x.value === state).color;
    };

    return {
      cardContent,
      getDate,
      stateColor,
    };
  },
};
</script>

<style lang="sass">
.cardTask
    cursor: pointer
    .text-description
        overflow-wrap: anywhere
</style>
