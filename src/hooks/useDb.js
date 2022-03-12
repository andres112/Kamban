import { db, timestamp } from "@/firebase.js";
import { ref } from "vue";
import { useStore } from "vuex";
import { collection, getDoc, getDocs, addDoc } from "firebase/firestore";

export const useDb = () => {
  const store = useStore();

  // TODO: change tasks for user identification. Each collection correspond to a user id
  const reference = collection(db, "tasks");
  const loading = ref(false);

  //   Get all documents from a collection
  const getAllTasks = async () => {
    try {
      loading.value = true;
      const tasks = await getDocs(reference);
      const groupedTasks = tasks.docs.reduce((acc, t) => {
        const data = { ...t.data() };
        if (!(data?.state in acc)) {
          acc[data?.state] = [{ id: t.id, ...data }];
        } else {
          acc[data?.state].push({ id: t.id, ...data });
        }
        return acc;
      }, {});
      store.state.tasks.STATES.forEach((key) => {
        store.commit("tasks/setTasksList", {
          payload: groupedTasks[key],
          type: key,
        });
      });
    } catch (error) {
      console.error(error);
      store.commit("settings/setAlertNotification", {
        text: "Upps!. Something happened. Check console for details.",
        type: "negative",
      });
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (task) => {
    try {
      const payload = {
        state: "todo",
        created: timestamp,
        category_id: "general",
        uid: store.state.user.userId,
        ...task,
      };
      console.dir(payload);
      await addDoc(reference, payload);
      store.commit("settings/setAlertNotification", {
        text: "Task added successfully!",
        type: "info",
      });
      // after adding task get all task again
      getAllTasks();
    } catch (error) {
      console.error(error);
      store.commit("settings/setAlertNotification", {
        text: "Upps!. Something happened. Check console for details.",
        type: "negative",
      });
    }
  };

  // Get a document from a collection
  const getTask = async (docId) => {
    try {
      loading.value = true;
      await getDoc(reference, docId);
    } catch (error) {
      console.error(error);
      store.commit("settings/setAlertNotification", {
        text: "Upps!. Something happened. Check console for details.",
        type: "negative",
      });
    } finally {
      loading.value = false;
    }
  };
  return {
    getAllTasks,
    addTask,
    getTask,
    loading,
  };
};
