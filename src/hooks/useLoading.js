import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

export const useLoading = () => {
  const $q = useQuasar();

  const show = () => {
    $q.loading.show({
        message: 'Please wait a moment. Something is happening...'
      });
  };

  const hide = () => {
    $q.loading.hide();
  };

  onBeforeUnmount(() => {
    hide();
  });

  return { show, hide };
};
