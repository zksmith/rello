import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import { addTask } from '../../redux/actions/boardActions';

import Task from '../task/Task';

const TaskContainer = ({ tasks, addTask, collectionId }) => {
  const [taskAddInProgress, setTaskAddInProgress] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = e => {
    e.preventDefault();
    if (newTaskText) addTask(collectionId, newTaskText);

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
          + Add another task
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.board.collections[ownProps.collectionId].taskIds.map(
      id => state.board.tasks[id]
    )
  };
};

const mapDispatchToProps = dispatch => ({
  addTask: (collectionId, subject) => dispatch(addTask(collectionId, subject))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
