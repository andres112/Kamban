<template>
  <q-card bordered v-if="isVisible" class="q-ma-xs cardTask">
    <q-card-section horizontal class="justify-between">
      <!-- content section -->
      <!-- TODO: include fields validation -->
      <q-card-section>
        <div class="text-h6">{{ name }}</div>
        <div class="text-caption q-pb-md">{{ getDate }}</div>
        <q-separator />
        <div class="text-body2 q-pt-md text-description">{{ text }}</div>
      </q-card-section>

      <!-- Menu section -->
      <q-card-actions vertical>
        <q-btn
          flat
          color="grey-7"
          icon="menu_open"
          @click="menuVisible = true"
          v-if="!menuVisible"
        >
          <q-tooltip> Open menu </q-tooltip>
        </q-btn>
        <!-- Menu options -->
        <transition-group appear enter-active-class="animated fadeIn">
          <q-btn
            flat
            color="primary"
            icon="create"
            @click.prevent="editTask"
            v-if="menuVisible"
          >
            <q-tooltip> Edit task </q-tooltip>
          </q-btn>
          <q-btn
            flat
            color="red"
            icon="delete_outline"
            @click.prevent="deleteCard"
            v-if="menuVisible"
          >
            <q-tooltip> Delete task </q-tooltip>
          </q-btn>
          <q-btn
            flat
            color="green"
            icon="sync_alt"
            @click.prevent="changeTaskState"
            v-if="menuVisible"
          >
            <q-tooltip> Move task </q-tooltip>
          </q-btn>
        </transition-group>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, ref, watch } from "vue";
import {useDb} from "@/hooks/useDb";
import moment from "moment";

export default {
  name: "Card",
  props: {
    content: { type: Object, default: () => {} },
  },
  setup(props) {
    // Bring function from hook
    const {deleteTask} = useDb();
    const isVisible = ref(false);
    const menuVisible = ref(false);

    if (props.content) {
      isVisible.value = true;
    }

    const getDate = computed(() => {
      const date = moment(props.content.date.seconds * 1000);
      return date.format("MMM Do YYYY, h:mm");
    });

    const deleteCard = () => {
      deleteTask(props.content.id);
      isVisible.value = false;
    };

    watch(
      () => menuVisible.value,
      (newVal) => {
        if (newVal) {
          setTimeout(() => {
            menuVisible.value = false;
          }, 5000);
        }
      }
    );

    return {
      isVisible,
      name: props.content?.name,
      text: props.content?.text,
      getDate,
      menuVisible,
      deleteCard
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
