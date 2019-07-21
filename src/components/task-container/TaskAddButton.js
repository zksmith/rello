import React, { useState } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';

import { addTaskIdToCollection } from '../../redux/actions/collectionActions';
import { addTask } from '../../redux/actions/boardActions';

const TaskAddButton = ({ addTask }) => {
  const [taskAddInProgress, setTaskAddInProgress] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = e => {
    e.preventDefault();
    if (newTaskText) addTask({ subject: newTaskText, content: '' });

    setTaskAddInProgress(false);
    setNewTaskText('');
  };

  if (taskAddInProgress)
    return (
      <form onSubmit={handleAddTask}>
        <input
          style={{ width: '100%' }}
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          onBlur={handleAddTask}
          autoFocus
        />
      </form>
    );
  return (
    <button className='add-button' onClick={() => setTaskAddInProgress(true)}>
      + Add another task
    </button>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTask: task => {
    const id = uuidv4();
    dispatch(addTask(id, task));
    dispatch(addTaskIdToCollection(id, ownProps.collectionId));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TaskAddButton);
