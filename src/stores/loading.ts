import { defineStore } from "pinia";

export type RootState = {
  loading: boolean;
};

export const useLoadingStore = defineStore({
  id: "alert",
  state: () =>
    ({
      loading: true,
    } as RootState),

  actions: {
    changeAlert(value: boolean) {
      this.loading = value;
    },
  },
});
