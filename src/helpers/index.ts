import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

export const findById = (resources: Array<any>, id: string | number) => {
  return resources.find((r) => r.id === id);
};

export const upsert = (resource: any[], value: any) => {
  if (!resource) return;
  const indexPosition = resource.findIndex((e) => e.id === value.id);
  if (indexPosition >= 0) {
    resource[indexPosition] = { ...value };
    return;
  }

  resource.push(value);
};

export const docToResource = (doc: DocumentSnapshot<DocumentData>) => {
  if (typeof doc.data !== "function") return doc;

  return { ...doc.data(), id: doc.id };
};
