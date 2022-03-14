<template>
  <q-card bordered v-if="showCard" class="q-ma-xs cardTask">
    <q-card-section horizontal class="justify-between">
      <!-- content section -->
      <!-- TODO: include fields validation -->
      <q-card-section>
        <div class="text-h6">{{ cardContent.name }}</div>
        <div class="text-caption q-pb-md">{{ getDate }}</div>
        <q-separator />
        <div class="text-body2 q-pt-md text-description">
          {{ cardContent.text }}
        </div>
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
            @click.prevent="editCard"
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
          <q-btn flat color="green" icon="sync_alt" v-if="menuVisible">
            <q-tooltip> Move task </q-tooltip>
            <q-menu
              anchor="bottom start"
              self="top middle"
              transition-show="rotate"
              transition-hide="rotate"
            >
              <q-list dense>
                <q-item
                  clickable
                  v-for="state in stateOptions"
                  :key="state.value"
                  @click.stop="moveCard(state)"
                >
                  {{ state.name }}
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </transition-group>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, ref, watch, inject, reactive } from "vue";
import { useDb } from "@/hooks/useDb";
import { useStore } from "vuex";
import moment from "moment";

const STATE_OPTIONS = [
  { value: "todo", name: "ToDo" },
  { value: "progress", name: "Progress" },
  { value: "done", name: "Done" },
  { value: "pause", name: "Paused" },
];

export default {
  name: "Card",
  props: {
    content: { type: Object, default: () => {} },
  },
  setup(props) {
    // Bring function from hook
    const { deleteTask, updateTask } = useDb();
    // Bring store from vuex
    const store = useStore();

    let cardContent = reactive(props.content);

    // call the provided props defined in Column.vue
    const { setVisibility } = inject("taskFormVisible");

    const showCard = ref(false);
    const menuVisible = ref(false);

    if (props.content) {
      showCard.value = true;
    }

    const getDate = computed(() => {
      const date = moment(cardContent.date.seconds * 1000);
      return date.format("MMM Do YYYY, h:mm");
    });
    const stateOptions = computed(() => {
      return STATE_OPTIONS.filter((state) => state.value !== cardContent.state);
    });

    const deleteCard = () => {
      deleteTask(props.content.id);
      showCard.value = false;
    };

    const editCard = () => {
      setVisibility(true);
      store.commit("tasks/setCurrentTask", props.content);
    };

    const moveCard = (state) => {
      updateTask(cardContent.id, { state: state.value });
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

    //TODO: pending include state functionality
    watch(
      () => props.content,
      () => {
        cardContent.name = props.content.name;
        cardContent.text = props.content.text;
        cardContent.date = props.content.date;
        cardContent.state = props.content.state;
      },
      { deep: true }
    );

    return {
      showCard,
      cardContent,
      getDate,
      menuVisible,
      deleteCard,
      editCard,
      moveCard,
      stateOptions,
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
