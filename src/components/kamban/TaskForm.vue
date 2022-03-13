<template>
  <q-dialog v-model="isVisible" persistent full-width @hide="closeWindow">
    <q-card>
      <q-toolbar class="bg-indigo text-white glossy shadow-2">
        <q-toolbar-title>
          <span class="text-weight-bold">{{
            isEdition ? "Update Task" : "Create New Task"
          }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="q-px-xl">
        <q-form>
          <!-- Task Name -->
          <q-input
            v-model="taskName"
            label="Name"
            name="taskName"
            type="text"
            aria-required="true"
          >
          </q-input>

          <!-- Task Due Date -->
          <q-input v-model="taskDateTime" class="q-mt-md" label="Datetime">
            <template v-slot:append>
              <!-- Date button -->
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="taskDateTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
              <!-- Time button -->
              <q-icon name="access_time" class="cursor-pointer q-pl-sm">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="taskDateTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <!-- Task Description -->
          <q-input
            v-model="taskDescription"
            label="Description"
            name="taskDescription"
            type="textarea"
            style="max-height: 250px"
            clearable
            clear-icon="close"
            class="q-mt-md"
          >
          </q-input>

          <q-btn
            color="indigo"
            class="q-mt-lg"
            @click.prevent="isEdition ? modifyTask() : createTask()"
          >
            {{ isEdition ? "Update Task" : "Create Task" }}
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { inject, ref, watch } from "vue";
import { useDb } from "@/hooks/useDb";
import { useStore } from "vuex";
import moment from "moment";
import { Timestamp } from "firebase/firestore";

export default {
  name: "TaskForm",
  setup() {
    const store = useStore();
    const { isVisible, setVisibility } = inject("taskFormVisible");

    const taskName = ref(null);
    const taskDescription = ref(null);
    const taskDateTime = ref(moment().format("YYYY-MM-DD HH:mm"));

    const isEdition = ref(false);

    // call from hook useDb
    const { addTask, updateTask } = useDb();

    const createTask = () => {
      addTask({
        name: taskName.value,
        text: taskDescription.value,
        date: Timestamp.fromDate(new Date(taskDateTime.value)),
      });
      setVisibility(false);
      clearForm();
    };

    const modifyTask = () => {
      updateTask(store.state.tasks.currentTask.id, {
        name: taskName.value,
        text: taskDescription.value,
        date: Timestamp.fromDate(new Date(taskDateTime.value)),
        state: store.state.tasks.currentTask.state,
      });
      setVisibility(false);
      clearForm();
    };

    const closeWindow = () => {
      store.commit("tasks/setCurrentTask", null);
      setVisibility(false);
      clearForm();
    };

    const clearForm = () => {
      taskName.value = null;
      taskDescription.value = null;
      taskDateTime.value = moment().format("YYYY-MM-DD HH:mm");
    };

    watch(
      () => store.state.tasks.currentTask,
      () => {
        isEdition.value = false;
        if (store.state.tasks.currentTask) {
          taskName.value = store.state.tasks.currentTask.name;
          taskDescription.value = store.state.tasks.currentTask.text;
          taskDateTime.value = moment(
            store.state.tasks.currentTask.date.seconds * 1000
          ).format("YYYY-MM-DD HH:mm");
          isEdition.value = true;
        }
      }
    );
    return {
      isVisible,
      isEdition,
      setVisibility,
      closeWindow,
      createTask,
      modifyTask,
      taskName,
      taskDescription,
      taskDateTime,
    };
  },
};
</script>

<style></style>
