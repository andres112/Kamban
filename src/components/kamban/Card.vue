<template>
  <q-card bordered v-if="isVisible" class="q-ma-xs cardTask">
    <q-card-section>
      <div class="text-h6">{{ name }}</div>
      <div class="text-caption">{{ getDate }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-body2">{{ text }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, ref } from "vue";
import moment from "moment";

export default {
  name: "Card",
  props: {
    content: { type: Object, default: () => {} },
  },
  setup(props) {
    const isVisible = ref(false);
    if (props.content) {
      isVisible.value = true;
    }

    const getDate = computed(() => {
      const date = moment(props.content.date.seconds * 1000);
      return date.format("MMM Do YYYY, h:mm");
    });

    return {
      isVisible,
      name: props.content?.name,
      text: props.content?.text,
      getDate,
    };
  },
};
</script>

<style lang="sass">
.cardTask
    cursor: pointer
</style>
