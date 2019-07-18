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

export const updateCollectionTaskIdsOnMove = (
  collections,
  collectionId,
  prevCollectionId,
  newTaskIds,
  prevTaskIds
) => ({
  ...collections,
  [collectionId]: {
    ...collections[collectionId],
    taskIds: newTaskIds
  },
  [prevCollectionId]: {
    ...collections[prevCollectionId],
    taskIds: prevTaskIds
  }
});
