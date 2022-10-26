import { ref } from "vue";
import { useLoadingStore } from "@/stores/loading";

export function useAsyncDataStatus() {
  const ready = ref(false);
  const loadingStore = useLoadingStore();
  function fetched() {
    ready.value = true;
    loadingStore.changeAlert(false);
  }

  return { fetched, ready };
}
