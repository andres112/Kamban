<template>
  <q-card bordered v-if="showCard" class="q-ma-xs cardTask">
    <q-card-section horizontal class="justify-between">
      <!-- content section -->
      <!-- TODO: include fields validation -->
      <q-card-section class="full-width">
        <div class="text-h6">{{ cardContent.name }}</div>
        <div class="text-caption q-pb-md">{{ getDate }}</div>
        <q-separator :color="stateColor" />
        <div class="text-body2 q-pt-md text-description">
          {{ getText }}
        </div>
        <q-btn
          color="white"
          :text-color="stateColor"
          label="More"
          flat
          unelevated
          size="0.75rem"
          class="q-pa-xs"
          @click="openCard"
        />
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

const MAX_LENGTH_TEXT = { normal: 297, short: 197 };

const STATE_OPTIONS = [
  { value: "todo", name: "ToDo", color: "deep-orange-9" },
  { value: "progress", name: "Progress", color: "green" },
  { value: "done", name: "Done", color: "blue" },
  { value: "pause", name: "Paused" },
];

export default {
  name: "Card",
  props: {
    content: { type: Object, default: () => {} },
  },
  setup(props, { emit }) {
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

    // options for move dropdown
    const stateOptions = computed(() => {
      return STATE_OPTIONS.filter((state) => state.value !== cardContent.state);
    });

    // limit the text length
    const getText = computed(() => {
      if (cardContent.text.length >= MAX_LENGTH_TEXT.normal) {
        return cardContent.text.slice(0, MAX_LENGTH_TEXT.normal) + "...";
      }
      return cardContent.text;
    });

    const stateColor = computed(() => {
      return STATE_OPTIONS.find((state) => state.value === cardContent.state)
        .color;
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

    const openCard = () => {
      store.commit("tasks/setCurrentTask", props.content);
      emit("openCard");
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
      getText,
      stateColor,
      menuVisible,
      deleteCard,
      editCard,
      moveCard,
      stateOptions,
      openCard,
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
