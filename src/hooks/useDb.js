import { db } from "@/firebase.js";
import { ref } from "vue";
import { collection, getDoc, getDocs } from "firebase/firestore";

export const useDb = () => {
  // TODO: change tasks for user identification. Each collection correspond to a user id
  const reference = collection(db, "tasks");
  const loading = ref(false);

  //   Get all documents from a collection
  const getAllTasks = async () => {
    try {
      loading.value = true;
      const tasks = await getDocs(reference);
      return tasks.map((t) => {
        return { id: t.id, ...t.data() };
      });
    } catch (error) {
      return {
        error,
        res: true,
      };
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
      return {
        error,
        res: true,
      };
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
