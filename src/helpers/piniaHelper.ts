import { findById } from ".";
import { db } from "@/plugins/firebase";
import { doc, getDoc } from "firebase/firestore";

const makeAppendChildToParentMutation = (
  state: any,
  parent: string,
  child: string
) => {
  return function ({ parentId, childId }: any) {
    const resource = findById(state[parent], parentId);
    if (!resource) return;
    resource[child] = (resource && resource[child]) || [];
    resource[child].push(childId);
  };
};

const fetchItem = async (
  store: any,
  method: string,
  resource: string,
  id: string
) => {
  const docThread = doc(db, resource, id);

  const docSnapThread = await getDoc(docThread);

  const item = {
    ...docSnapThread.data(),
    id: docSnapThread.id,
  } as Object;

  store()[method]({ ...item });

  return item;
};

const fetchAllItems = async (
  store: any,
  methodFetchItem: string,
  resource: string,
  ids: Array<string>
) => {
  return Promise.all(
    ids.map((id) => fetchItem(store, methodFetchItem, resource, id))
  );
};

export { fetchItem, fetchAllItems, makeAppendChildToParentMutation };
