import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import './TaskContainer.scss';
import Task from './Task';
import TaskAddForm from './TaskAddForm';

const TaskContainer = ({ filterdTasks, collectionId }) => {
  const [taskAddInProgress, setTaskAddInProgress] = useState(false);

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
      {/* TODO: Move task form to seperate component and place the button here */}
      {taskAddInProgress ? (
        <TaskAddForm
          collectionId={collectionId}
          setTaskAddInProgress={setTaskAddInProgress}
        />
      ) : (
        <button
          className='add-button'
          onClick={() => setTaskAddInProgress(true)}
        >
          + Add another task
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const tasksInCollection = state.collectionState.collections[
    ownProps.collectionId
  ].taskIds.map(id => state.collectionState.tasks[id]);

  return {
    filterdTasks: tasksInCollection.filter(task =>
      task.subject.toLowerCase().includes(state.collectionState.filter)
    )
  };
};

export default connect(mapStateToProps)(TaskContainer);
