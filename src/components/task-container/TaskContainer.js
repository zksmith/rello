import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import { addTask } from '../../redux/board/boardActions';

import Task from '../task/Task';

const TaskContainer = ({ tasks, addTask, collectionId }) => {
  const [taskAddInProgress, setTaskAddInProgress] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    //If there are no tasks in collection isEmptyCollection = true
    const isEmptyCollection = !tasks;

    if (newTaskText) addTask(isEmptyCollection, collectionId, newTaskText);

    setTaskAddInProgress(false);
    setNewTaskText('');
  };

  return (
    <>
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

      {taskAddInProgress ? (
        <form onSubmit={handleAddTask}>
          <input
            style={{ width: '100%' }}
            value={newTaskText}
            onChange={e => setNewTaskText(e.target.value)}
            onBlur={handleAddTask}
          />
        </form>
      ) : (
        <button
          className='add-button'
          onClick={() => setTaskAddInProgress(true)}
        >
          + Add another card
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  tasks: state.board.tasks[ownProps.collectionId]
});

const mapDispatchToProps = dispatch => ({
  addTask: (isEmptyCollection, collectionId, task) =>
    dispatch(addTask(isEmptyCollection, collectionId, task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
