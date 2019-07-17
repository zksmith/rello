import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addTask } from '../../redux/actions/boardActions';

const TaskAddButton = ({ addTask }) => {
  const [taskAddInProgress, setTaskAddInProgress] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = e => {
    e.preventDefault();
    if (newTaskText) addTask(newTaskText);

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
  addTask: subject => dispatch(addTask(ownProps.collectionId, subject))
});

export default connect(
  null,
  mapDispatchToProps
)(TaskAddButton);
