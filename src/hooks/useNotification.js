import { useQuasar } from "quasar";

export const useNotification = () => {
  const notify = (text, position, color = "indigo-7") => {
    const $q = useQuasar();

    return {
      showNotif() {
        $q.notify({
          message: "Jim pinged you.",
          color: "purple",
        });
      },
    };
  };

  return { notify };
};
