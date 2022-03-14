import { db, timestamp } from "@/firebase.js";
import { ref } from "vue";
import { useStore } from "vuex";
import {
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const useDb = () => {
  const store = useStore();

  // TODO: change tasks for user identification. Each collection correspond to a user id

  const reference = collection(db, "tasks");
  const loading = ref(false);

  //   Get all documents from a collection
  const getAllTasks = async () => {
    try {
      loading.value = true;
      // set a query to respect the rules in firebase
      const q = query(reference, where("uid", "==", store.state.user.userId));
      const tasks = await getDocs(q);
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

  // Create a new document in a collection
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

  // Update a document in a collection
  const updateTask = async (docId, payload) => {
    try {
      //TODO: change tasks for user id
      const docReference = doc(db, "tasks", docId);
      await updateDoc(docReference, payload);
      store.commit("settings/setAlertNotification", {
        text: "Task updated successfully!",
        type: "info",
      });
      // after updating update task in interface
      getAllTasks();
    } catch (error) {
      console.error(error);
      store.commit("settings/setAlertNotification", {
        text: "Upps!. Something happened. Check console for details.",
        type: "negative",
      });
    }
  };

  // Delete a document from a collection
  const deleteTask = async (docId) => {
    try {
      //TODO: change tasks for user id
      await deleteDoc(doc(db, "tasks", docId));
      store.commit("settings/setAlertNotification", {
        text: "Task deleted successfully!",
        type: "info",
      });
      // after deleting task get all task again
      getAllTasks();
    } catch (error) {
      console.error(error);
      store.commit("settings/setAlertNotification", {
        text: "Upps!. Something happened. Check console for details.",
        type: "negative",
      });
    }
  };
  return {
    getAllTasks,
    addTask,
    getTask,
    deleteTask,
    updateTask,
    loading,
  };
};
