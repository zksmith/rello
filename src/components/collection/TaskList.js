import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../task/Task';

const TaskList = ({ tasks, collectionId }) => {
  return (
    <Droppable droppableId={collectionId}>
      {provided => (
        <div
          style={{ padding: '5px' }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks &&
            tasks.map((task, index) => (
              <Task key={index} task={task} index={index} />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
