<template>
  <q-dialog
    v-model="isVisible"
    persistent
    full-width
    @hide="setVisibility(false)"
  >
    <q-card>
      <q-toolbar class="bg-indigo text-white glossy shadow-2">
        <q-toolbar-title>
          <span class="text-weight-bold">Create New Task</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="q-px-xl">
        <q-form @submit.prevent="createTask">
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
            style="max-height: 300px"
            clearable
            clear-icon="close"
            class="q-mt-md"
          >
          </q-input>

          <q-btn color="indigo" class="q-mt-lg" type="submit">
            Create Task
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { inject, ref } from "vue";
import { useDb } from "@/hooks/useDb";
import moment from "moment";
import { Timestamp } from "firebase/firestore";

export default {
  name: "TaskForm",
  setup() {
    const { isVisible, setVisibility } = inject("taskFormVisible");

    const taskName = ref(null);
    const taskDescription = ref(null);
    const taskDateTime = ref(moment().format("YYYY-MM-DD HH:mm"));

    const db = useDb();

    const createTask = () => {
      db.addTask({
        name: taskName.value,
        text: taskDescription.value,
        date: Timestamp.fromDate(new Date(taskDateTime.value)),
      });
      setVisibility(false);
      clearForm();
    };

    const clearForm = () => {
      taskName.value = null;
      taskDescription.value = null;
      taskDateTime.value = moment().format("YYYY-MM-DD HH:mm");
    };
    return {
      isVisible,
      setVisibility,
      createTask,
      taskName,
      taskDescription,
      taskDateTime,
    };
  },
};
</script>

<style></style>
