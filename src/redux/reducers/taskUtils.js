export const updateCollectionTaskIds = (
  collections,
  collectionId,
  newTaskIds
) => ({
  ...collections,
  [collectionId]: {
    ...collections[collectionId],
    taskIds: newTaskIds
  }
});
