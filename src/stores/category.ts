import type Category from "@/interfaces/category";
import { defineStore } from "pinia";
import { db } from "@/plugins/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { upsert } from "@/helpers";
import { fetchItem } from "@/helpers/piniaHelper";

export type RootState = {
  categories: Category[];
};

export const useCategoryStore = defineStore({
  id: "category",
  state: () =>
    ({
      categories: [],
    } as RootState),
  actions: {
    fetchCategory(id: string) {
      return fetchItem(useCategoryStore, "setCategory", "categories", id);
    },
    async fetchAllCategories() {
      const q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);

      const categories = querySnapshot.docs.map((doc) => {
        const item = { ...doc.data(), id: doc.id } as Category;

        this.setCategory(item);

        return item;
      });

      return categories;
    },
    setCategory(category: Category) {
      upsert(this.categories, category);
    },
  },
});
