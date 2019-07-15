import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './Task.scss';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={index + task} index={index}>
      {provided => (
        <div
          className='task'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{task}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
