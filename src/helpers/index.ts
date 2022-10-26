export const findById = (resources: Array<any>, id: string | number) => {
  return resources.find((r) => r.id === id);
};

export const upsert = (resource: any[], value: any) => {
  if (!resource) return;
  const exists = resource.find((e) => e.id === value.id);
  if (exists) return;

  resource.push(value);
};
