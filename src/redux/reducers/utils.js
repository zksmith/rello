export const deleteTasks = (taskIds, currentTasks) => {
  const newTasks = currentTasks;
  taskIds.forEach(id => {
    delete newTasks[id];
  });
  return newTasks;
};
