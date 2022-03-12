import { db } from "@/firebase.js";
import { ref } from "vue";
import { useStore } from "vuex";
import { collection, getDoc, getDocs } from "firebase/firestore";

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
          return acc;
        }
        return acc[data?.state].push({ id: t.id, ...data });
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
    getTask,
    loading,
  };
};
