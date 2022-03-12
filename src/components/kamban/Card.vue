<template>
  <q-card bordered v-if="isVisible" class="q-ma-xs">
    <q-card-section>
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">Deadline</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-body2">{{ text }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";

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
    return {
      isVisible,
      name: props.content?.name,
      text: props.content?.text,
      date: props.content?.date,
    };
  },
};
</script>

<style></style>
