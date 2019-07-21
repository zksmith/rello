export const deleteTasks = (taskIds, currentTasks) => {
  const newTasks = currentTasks;
  taskIds.forEach(id => {
    delete newTasks[id];
  });
  return newTasks;
};

export const deleteItem = (itemKey, object) => {
  const prevObject = { ...object };
  delete prevObject[itemKey];
  return prevObject;
};
