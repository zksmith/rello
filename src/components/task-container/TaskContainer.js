import React from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import './TaskContainer.scss';
import Task from './Task';
import TaskAddButton from './TaskAddButton';

const TaskContainer = ({ filterdTasks, collectionId }) => {
  return (
    <>
      <Droppable droppableId={collectionId} type='task'>
        {provided => (
          <div
            className='task-container'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filterdTasks &&
              filterdTasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  collectionId={collectionId}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TaskAddButton collectionId={collectionId} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const tasksInCollection = state.collectionState.collections[
    ownProps.collectionId
  ].taskIds.map(id => state.collectionState.tasks[id]);

  return {
    filterdTasks: tasksInCollection.filter(task =>
      task.subject.includes(state.collectionState.filter)
    )
  };
};

export default connect(mapStateToProps)(TaskContainer);
