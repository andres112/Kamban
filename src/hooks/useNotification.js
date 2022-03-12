import { useQuasar } from "quasar";
import { useStore } from "vuex";

export const useNotification = () => {
  const store = useStore();
  const $q = useQuasar();
  const notify = () => {
    // dependency of state.alertNotification

    $q.notify({
      message: store.state.settings.alertNotification?.text,
      position: store.state.settings.alertNotification?.position ?? "bottom",
      type: store.state.settings.alertNotification?.type ?? "ongoing",
      textColor:"white",
      closeBtn:true
    });
  };

  return { notify };
};
